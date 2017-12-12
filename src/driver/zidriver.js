const EventEmitter = require('events').EventEmitter;
const SerialPort = require('serialport');
const CommandBuilder = require('./commandBuilder.js');
const ResponseBuilder = require('./responseBuilder.js');

const FRAME_START = 0x01;
const FRAME_STOP = 0x03;
const FRAME_ESCAPE_XOR = 0x10;
const FRAME_ESCAPE= 0x02;

const ZIDRIVER_LOGGERS = {
	console: { log: console.log, warn: console.warn, error: console.error, debug: console.debug },
	nolog:   { log: ()=>{},          warn: ()=>{},           error: ()=>{},            debug: ()=>{} },
};

/* =========================== ZiDriver events ===================================
	'open', 'close', 'error',
	'raw_out', 'command', 'command_xxx_yyy',
	'raw_in', 'response', 'response_xxx_yyy'
*/

/* =========================== ONE FRAME =========================================
	|   0   |   1   |   2   |   3   |   4   |   5   |      n+5     |  n+6  |  n+7  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| Start |    MSG TYPE   |    LENGTH     | CHKSM |      DATA    | RSSI  | STOP  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| 0x01  |               |       n       |       |              |       | 0x03  |

	for every byte between 0x00 and 0x10, it must be replaced by an escape sequence: [0x02, (0x10 XOR byte) ]
	example: 0x06 becomes [0x02, 0x10 ^ 0x06] <=> [0x02, 0x16]
	checksum = ( 0x00    XOR    MSG_TYPE    XOR    LENGTH    XOR    RSSI    XOR    DATA )
*/

class ZiDriver extends EventEmitter {
	constructor(options) {
		options = options || {};
		super();

	  this.serialOptions = {
	    baudRate: options.baudRate || 115200,
	    dataBits: options.dataBits || 8,
	    parity: options.parity || 'none', /* one of ['none', 'even', 'mark', 'odd', 'space'] */
	    stopBits: options.stopBits || 1, /* one of [1,2] */
	    lock: options.lock === false ? false : true,
	  };

		this.port = null;
	  this.parser = null;
	  this.serial = null;
		this.logger = typeof(options.logger) === 'object' ? options.logger : ZIDRIVER_LOGGERS[options.logger  || 'nolog'];

		CommandBuilder.LOGS = this.logger;
		this.commands = new CommandBuilder();
		this.commands.loadCommands(options.commandPath || __dirname+'/commands');

		ResponseBuilder.LOGS = this.logger;
		this.responses = new ResponseBuilder();
		this.responses.loadResponses(options.responsePath || __dirname+'/responses');

		if (this.port) {
			this.open(options.port);
		}
	}
	static get LOGGERS() {
		return ZIDRIVER_LOGGERS;
	};

	get isOpen() {
		return this.serial ? true : false;
	}

	open(port, callback) {
		callback = callback || (()=>{});

		if (!this.isOpen && port) {
			// connect to the port provided
			this.port = port;
			var p = new Promise((resolve, reject)=> {
				this.serial = new SerialPort(port, this.serialOptions, (err) => {
					if (err) {
						this.serial = null;
						this.parser = null;
						this.port = null;
						var ziError = new Error("Error while opening ZiGate port '"+port+"': "+err);
						if (process.platform.indexOf("win") === 0 && (""+err).indexOf('File not found') >=0) {
							ziError = new Error("Error while opening ZiGate port '"+port+"': "+err+" ; aren't windows drivers missing ?" );
						}
						this.emitError(ziError);
						reject(ziError)
					} else {
						this.logger.log("[ZiDriver] successfully connected to device '"+this.port+"'.");
						this.emit('open');
						resolve();
					}
				});
				this.parser = this.serial.pipe(new SerialPort.parsers.Delimiter({ delimiter: [FRAME_STOP] }));
				this.parser.on('data', (raw_in) => { this.onSerialData(raw_in); });
				this.serial.on('error', (err) => { this.onSerialError(err) });
				this.serial.on('close', () => { this.onSerialClosed(this.port); });
			});
			p.then(callback, callback);
			return p;
		}
		else if (!this.isOpen && !port) {
			// no port provided ? use 1st port gathered by auto-detection.
			return ZiDriver.guessZigatePorts()
				.then((ports) => {
					return this.open(ports[0].comName, callback);
				})
				.catch((err) => {
					throw new Error("no port provided & auto-detection failed.");
				});

		}
		else {
			// already open ? close first and reopen with new (/same) port.
			return this.close().then(this.open(port, callback));
		}
	}

	close(callback) {
		var p = new Promise((resolve, reject) => {
			if (this.serial) {
				var serial = this.serial
				this.serial = null;
				this.parser = null;
				this.port = null;
				if (serial.isOpen) {
					serial.close((err) => {
						if (!err) {
							resolve();
						} else {
							reject(err);
						}
					});
				}
			}
			else {
				// was not opened yet ; immediatly resolve.
				resolve();
			}
		});
		p.then(callback);
		return p;
	}

	parseFrame(raw_in) {
		try {
			var data = this.unescapeData(raw_in);
			data.str = data.toString('hex').replace(/../g, "$& ");
			// this.logger.log("[ZiDriver] Frame received ; raw: ", raw_in.toString('hex').replace(/../g, "$& "));
			// this.logger.log("[ZiDriver] Frame received ; data: ", data.str);

		  if (data[0] !== FRAME_START) {
				this.emitError(new Error("[ZiDriver] corrupted frame received: invalid 'frame_start' character: " + data.str), /*autoclose*/ false);
				return false;
			}
		  if (data.length < 6) {
				this.emitError(new Error("[ZiDriver] corrupted frame received: less than 8 bytes long ("+data.length+" bytes). ",  data), /*autoclose*/ false);
				return false;
			}

			let typeid = data.readUInt16BE(1);
			let length = data.readUInt16BE(3);
			let checksum = data.readUInt16BE(5);
			let payload = data.slice(6, 6+length-1); // the rest of frame except rssi (1 byte)
			let rssi = data[data.length-1];

			if (payload.length !== length - 1) {
				this.emitError(new Error("[ZiDriver] corrupted frame received: inconsistent frame length attribute ("+length+") vs. payload length ("+payload.length+") + 1 (rssi). " + data.str), /*autoclose*/ false);
				return false;
			}

			var response = this.responses.parse(typeid, payload);
			if (response) {
				response.rssi = rssi || undefined;
				this.logger.log("[ZiDriver] response received: "+JSON.stringify(response));
				this.emit('response_'+response.type.name, response);
				this.emit('response', response);
				if (typeid === 0x8000) {
					// special handling for 'status' response messages.
					this.emit('status_'+response.requestType, response);
				}
				return true;
			}
			else {
				this.emitError(new Error("[ZiDriver] unrecognized response received (type="+typeid+"): "+payload.toString('hex').replace(/../g, "$& ")), /*autoclose*/ false);
				return false;
			}
		} catch (e) {
					this.logger.error("[ZiDriver] exception while parsing frame: ", e);
					this.logger.error("[ZiDriver] raw data: "+raw_in.toString('hex').replace(/../g, "$& "));
		}
	}

	send(name, options) {
		var p = new Promise((resolve, reject)=> {

			if (!this.isOpen) throw new Error("Zigate not connected yet.");

			var command = this.commands.build(name, options);
			command.promise = p;
			command.timestamp = new Date();

			var raw_out = Buffer.alloc(command.payload.length+5);
			raw_out.writeUInt16BE(command.type.id, 0);
			raw_out.writeUInt16BE(command.payload.length, 2);

			var checksum = 0x00
			checksum ^= command.type.id >> 8;
			checksum ^= command.type.id %256;
			checksum ^= command.payload.length >> 8;
			checksum ^= command.payload.length %256;
			var i = 5;
			for (const b of command.payload) {
				raw_out[i++] = b;
				checksum ^= b;
			}
			raw_out.writeUInt8(checksum, 4);
			this.logger.log("[ZiDriver] sending frame: 01 "+raw_out.toString('hex').replace(/../g, "$& ")+ "03");
			this.logger.log("[ZiDriver] sending command: "+JSON.stringify(command));

			raw_out = this.escapeData(raw_out);
		  // this.logger.log("[ZiDriver] sending escaped frame: 01 "+escapeData(raw_out).toString('hex').replace(/../g, "$& ")+"03");

		  this.serial.write([FRAME_START]);
			this.serial.write(raw_out);
		  this.serial.write([FRAME_STOP]);

			this.emit('raw_out', raw_out);
			this.emit('command', command);
			this.emit('command_'+command.type.name, command);

			resolve(command);
		});
		return p;
	}

	static guessZigatePorts(callback/*(err, ports)*/) {
		callback = callback || (()=>{});

	  //console.debug("[ZiDriver] retrieving list of available serial devices");
		var p = new Promise((resolve, reject) => {
			SerialPort.list((err, ports) => {
		    if (!err) {
					//console.debug("[ZiDriver] "+ports.length+" serial devices found.");
		      // discard logical tty, like /dev/ttyS1
		      var ziports = ports.filter((p) => { return p.vendorId && p.vendorId.toLowerCase() === '067b' && p.productId === '2303'; });
					if (ziports.length) {
						resolve(ziports);
					}
					else {
						reject(new Error(""+ports.length+" ports detected and no ZiGate port found."));
					}
		    }
				else {
					reject(err);
				}
		  });
		});
		p.then(callback.bind(this, undefined), callback.bind(this));
		return p;

		/* ZiGate port example: { manufacturer: 'Prolific Technology Inc.',
			comName: '/dev/ttyUSB0'
			vendorId: '067b',
			productId: '2303',
	    serialNumber: undefined,
			pnpId: 'usb-Prolific_Technology_Inc._USB-Serial_Controller-if00-port0',
	    locationId: undefined,
		} */
	}

	emitError(err, autoclose) {
		this.logger.error("[ZiDriver] ERROR: ", err);
	  process.nextTick(this.emit.bind(this, 'error', err));
	  if (autoclose && this.isOpen) {
	    this.serial.close();
	  }
	}
	onSerialData(raw_in) {
		this.emit('raw_in', raw_in.slice(1));
		this.parseFrame(raw_in);
	}
	onSerialClosed(port) {
		if (this.serial) {
			this.logger.log("[ZiDriver] port '"+port+"' closed.");
			this.emit('close', port);
			this.serial = null;
			this.parser = null;
			this.port = null;
		}
	}
	onSerialError(err) {
		this.emitError(err, /*autoclose*/ false);
	}

	unescapeData(data) {
		var decodedLength = 0;
		var decodedData = Buffer.alloc(data.length);
		var i=0;
		while (i<data.length) {
			if (data[i] === FRAME_START && i>0) {
				this.logger.warn("[ZiDriver] FRAME_START(0x01) byte found in the middle of the data (pos "+i+"): 1st message after a ZiGate reset ?");
				this.logger.warn("[ZiDriver]   => raw data = "+data.toString('hex').replace(/../g, "$& "));
				// this.parseFrame(data.slice(0, i));
				return this.unescapeData(data.slice(i));
			}
			else if (data[i] === FRAME_ESCAPE) {
				if ((i+1)<data.length) {
					decodedData[decodedLength++] = data[++i] ^ FRAME_ESCAPE_XOR;
				}
				else {
					throw new Error(" FRAME_ESCAPE(0x02) byte found at the end of the data.");
				}
			}
			else {
				decodedData[decodedLength++] = data[i];
			}
			i++;
		}
		return decodedData.slice(0, decodedLength);
	}

	escapeData(data) {
		var encodedLength = 0;
		var encodedData = Buffer.alloc(data.length*2);
		for (const b of data) {
			if (b <= FRAME_ESCAPE_XOR) {
				encodedData[encodedLength++] = FRAME_ESCAPE;
				encodedData[encodedLength++] = b ^ FRAME_ESCAPE_XOR;
			}
			else {
				encodedData[encodedLength++] = b;
			}
		}
		return encodedData.slice(0, encodedLength);
	}

}

module.exports = ZiDriver;
