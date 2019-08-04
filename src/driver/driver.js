const EventEmitter = require('events').EventEmitter;
const SerialPort = require('serialport');
const CommandBuilder = require('./commandBuilder.js');
const ResponseBuilder = require('./responseBuilder.js');
const Enum = require('./enum.js');
const util = require('util');

const FRAME_START = 0x01;
const FRAME_STOP = 0x03;
const FRAME_ESCAPE_XOR = 0x10;
const FRAME_ESCAPE= 0x02;

const DRIVER_LOGGERS = {
	nolog:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: ()=>{},       },
	console: { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	trace:   { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	debug:   { trace: ()=>{},        debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	info:    { trace: ()=>{},        debug: ()=>{},        info: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: console.error },
};

/* =========================== Driver events ===================================
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

class Driver extends EventEmitter {
	constructor(options) {
		options = options || {
			log: null,
			commandspath: null,
			responsespath: null,
		};
		super();

	  this.serialOptions = {
	    baudRate: options.baudRate || 115200,
	    dataBits: options.dataBits || 8,
	    parity: options.parity || 'none', /* one of ['none', 'even', 'mark', 'odd', 'space'] */
	    stopBits: options.stopBits || 1, /* one of [1,2] */
	    lock: options.lock === false ? false : true,
	  };

		this.pendingCommands = [];

		this.port = null;
	  this.parser = null;
	  this.serial = null;
		this.logger = DRIVER_LOGGERS[options.log]
									|| (options.log && options.log.getLogger && options.log.getLogger('driver'))
									|| (options.log && options.log.trace && options.log.debug && options.log.info && options.log.warn && options.log.error && options.log)
									|| DRIVER_LOGGERS['nolog'];

		CommandBuilder.LOGS = this.logger;
		this.commands = new CommandBuilder();
		this.commands.loadCommands(options.commandspath || __dirname+'/commands');

		ResponseBuilder.LOGS = this.logger;
		this.responses = new ResponseBuilder();
		this.responses.loadResponses(options.responsespath || __dirname+'/responses');

		if (this.port) {
			this.open(options.port);
		}
	}
	static get LOGGERS() {
		return DRIVER_LOGGERS;
	};

	get isOpen() {
		return this.serial ? true : false;
	}
	get pending() {
		return this.pendingCommands.slice();
	};

	open(port, callback) {
		if (port === 'auto') port = null;

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
						this.logger.error("[Driver] Error while opening ZiGate port '"+port+"': "+err);
						var ziError = new Error("Error while opening ZiGate port '"+port+"': "+err);
						if (process.platform.indexOf("win") === 0 && (""+err).indexOf('File not found') >=0) {
							ziError = new Error("Error while opening ZiGate port '"+port+"': "+err+" ; aren't windows drivers missing ?" );
						}
						this.emitError(ziError);
						reject(ziError)
					} else {
						this.logger.info("[Driver] successfully connected to device '"+this.port+"'.");
						this.emit('open');
						resolve(this);
					}
				});
				this.parser = this.serial.pipe(new SerialPort.parsers.Delimiter({ delimiter: [FRAME_STOP] }));
				this.parser.on('data', (raw_in) => { this.onSerialData(raw_in); });
				this.serial.on('error', (err) => { this.onSerialError(err) });
				this.serial.on('close', () => { this.onSerialClosed(this.port); });
			});
			if (callback) {
				p.then(() => { callback(undefined, this); }, (err) => { callback(err, undefined); });
			}
			return p;
		}
		else if (!this.isOpen && !port) {
			// no port provided ? use 1st port gathered by auto-detection.
			return Driver.guessZigatePorts().then(
			(ports) => {
					return this.open(ports[0].comName, callback);
			},(err) => {
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
		p = p.then(callback, callback);
		return p;
	}

	parseFrame(raw_in) {
		try {
			this.logger.debug("[Driver] received raw frame: "+raw_in.toString('hex'));
			var data = this.unescapeData(raw_in);
			data.str = data.toString('hex').replace(/../g, "$& ");

		  if (data[0] !== FRAME_START) {
				this.emitError(new Error("[Driver] corrupted frame received: invalid 'frame_start' character: " + data.str), /*autoclose*/ false);
				return false;
			}
		  if (data.length < 6) {
				this.emitError(new Error("[Driver] corrupted frame received: less than 8 bytes long ("+data.length+" bytes). ",  data), /*autoclose*/ false);
				return false;
			}

			let typeid = data.readUInt16BE(1);
			let length = data.readUInt16BE(3);
			let checksum = data.readUInt16BE(5);
			let payload = data.slice(6, 6+length-1); // the rest of frame except rssi (1 byte)
			let rssi = data[data.length-1];

			if (payload.length !== length - 1) {
				this.emitError(new Error("[Driver] corrupted frame received: inconsistent frame length attribute ("+length+") vs. payload length ("+payload.length+") + 1 (rssi). " + data.str), /*autoclose*/ false);
				return false;
			}

			var response = this.responses.parse(typeid, payload);
			if (response) {
				if (typeof(rssi) !== 'undefined') response.rssi = rssi;
				this.logger.debug("[Driver] response received: ", util.inspect(response, {breakLength: 10000}));
				//this.logger.debug("[Driver] response raw data: ", data.str);
				this.emit('response_'+response.type.name, response);
				this.emit('response', response);

				// special handling for 'status' response messages.
				if (typeid === 0x8000) {
					this.postProcessStatusResponse(response);
				}
				else {
					this.postProcessNonStatusResponse(response);
				}
				return true;
			}
			else {
				this.emitError(new Error("[Driver] unrecognized response received (type="+typeid.toString(16)+"): "+payload.toString('hex').replace(/../g, "$& ")), /*autoclose*/ false);
				return false;
			}
		} catch (e) {
					this.logger.error("[Driver] exception while parsing frame: "+ e);
					this.logger.error(e.stack);
					this.logger.error("[Driver] raw data: "+raw_in.toString('hex').replace(/../g, "$& "));
		}
	}
	postProcessStatusResponse(status) {
		// try to match with a pending command
		for (var commandIndex=0; commandIndex<this.pendingCommands.length; ++commandIndex) {
			var cmd = this.pendingCommands[commandIndex];
			if (cmd.type.statusExpected && !cmd.status && cmd.type.id === status.relatedTo.id) {
				cmd.status = status;

				// validate the status
				var statusIsValid = false;
				if (typeof(cmd.type.statusExpected === 'object')) {
					statusIsValid = true;
					for (var k in cmd.type.statusExpected) {
						var condition = cmd.type.statusExpected[k];
						if (typeof(condition) === 'function') {
							try {
								var conditionOk = condition(status, cmd);
								if (!conditionOk) {
									this.logger.warn("[Driver] status response criterion '"+k+" failed for command '"+cmd.type+"'.");
									statusIsValid = false;
									break;
								}
							} catch (e) {
									this.logger.warn("[Driver] status response criterion '"+k+" thrown an error for command '"+cmd.type+"': "+e);
									statusIsValid = false;
							}
						}
					} // for each status criterion
				}
				else {
					// statusExpected is a simple boolean
					statusIsValid = (cmd.status.id === 0x00);
				}

				if (statusIsValid) {
					this.logger.debug("[Driver] status received & matched with command '"+cmd.type+"'");

					if (!cmd.type.responseExpected) {
						this.pendingCommands.splice(commandIndex, 1);
						this.emit('command_fullfilled', cmd);
						cmd.cmdPromiseResolve(status);
					}
					else {
						this.emit('command_started', cmd, status);
					}
				}
				else {
					this.pendingCommands.splice(commandIndex, 1);
					this.logger.warn("[Driver] command failed: "+cmd.type+"");
					this.emit('command_failed', cmd, status);
					cmd.cmdPromiseReject(status);
				}
				break;
			}
		}
		// in all cases, emit special 'status' event.
		this.emit('status_'+status.relatedTo.name, status);
	}

	postProcessNonStatusResponse(response) {
		for (var commandIndex=0; commandIndex<this.pendingCommands.length; ++commandIndex) {
			var cmd = this.pendingCommands[commandIndex];
			if ( (!cmd.type.statusExpected || cmd.status) && cmd.type.responseExpected && !cmd.response && cmd.type.responseExpected === response.type.name) {
				cmd.response = response;
				this.pendingCommands.splice(commandIndex, 1);
				this.logger.debug("[Driver] response received has been well matched with initiating command '"+cmd.type+"'");

				this.emit('command_fullfilled', cmd);
				cmd.cmdPromiseResolve(response);
				break;
			}
		}
	}

	send(name, options) {
		if (!this.isOpen) return Promise.reject(new Error("Zigate not connected yet."));
		var command = null;
		try {
			command = this.commands.build(name, options);
		}
		catch (e) {
			this.logger.warn("[Driver] exception while building command: "+e);
			return Promise.reject(e);
		}

		try {
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
			this.logger.debug("[Driver] sending frame: 01 "+raw_out.toString('hex').replace(/../g, "$& ")+ "03");
			this.logger.debug("[Driver] sending command: ", util.inspect(command, {breakLength: 10000}));

			raw_out = this.escapeData(raw_out);
			this.logger.info("[Driver] sending raw frame: 01 "+escapeData(raw_out).toString('hex')+" 03");

			this.serial.write([FRAME_START]);
			this.serial.write(raw_out);
			this.serial.write([FRAME_STOP]);

			// registering this pending command if further responses are expected
			if (command.type.statusExpected || command.type.responseExpected) {
				this.pendingCommands.push(command);
			}
			else {
				command.cmdPromiseResolve(command);
			}

			this.emit('raw_out', raw_out);
			this.emit('command', command);
			this.emit('command_'+command.type.name, command);

		} catch (e) {
			this.logger.warn("[Driver] exception while sending command "+command.type+": "+e);
			command.cmdPromiseReject(e);
		}
		finally {
			return command.cmdPromise;
		}
	}

	static guessZigatePorts(callback/*(err, ports)*/) {
		callback = callback || (()=>{});

	  //console.debug("[Driver] retrieving list of available serial devices");
		var p = new Promise((resolve, reject) => {
			SerialPort.list((err, ports) => {
		    if (!err) {
					//console.debug("[Driver] "+ports.length+" serial devices found.");
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
		if (callback) p.then((ports) => { callback(undefined, ports); }, (err) => { callback(err); });
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
		this.logger.error("[Driver] ERROR: ", err);
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
			this.logger.info("[Driver] port '"+port+"' closed.");
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
				this.logger.warn("[Driver] FRAME_START(0x01) byte found in the middle of the data (pos "+i+"): 1st message after a ZiGate reset ?");
				this.logger.warn("[Driver]   => raw data = "+data.toString('hex').replace(/../g, "$& "));
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

module.exports = Driver;
