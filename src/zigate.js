const EventEmitter = require('events').EventEmitter;
const util = require('util');
const SerialPort = require('serialport');
const CommandBuilder = require('./commandBuilder.js');
const ResponseBuilder = require('./responseBuilder.js');

const DEFAULT_BAUD_RATE = 115200;
const DEFAULT_DATA_BITS = 8;
const DEFAULT_PARITY = 'none'; /* one of ['none', 'even', 'mark', 'odd', 'space'] */
const DEFAULT_STOP_BITS = 1; /* one of [1,2] */

const FRAME_START = 0x01;
const FRAME_STOP = 0x03;
const FRAME_ESCAPE_XOR = 0x10;
const FRAME_ESCAPE= 0x02;

/*
	|   0   |   1   |   2   |   3   |   4   |   5   |      n+5     |  n+6  |  n+7  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| Start |    MSG TYPE   |    LENGTH     | CHKSM |      DATA    | RSSI  | STOP  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| 0x01  |               |       n       |       |              |       | 0x03  |

	for every byte between 0x00 and 0x10, it must be replaced by an escape sequence: [0x02, (0x10 XOR byte) ]
	example: 0x06 becomes [0x02, 0x10 ^ 0x06] <=> [0x02, 0x16]
	checksum = ( 0x00    XOR    MSG_TYPE    XOR    LENGTH    XOR    RSSI    XOR    DATA )

*/

var Zigate = function(options) {
  options = options || {};
  this.options = {
    baudRate: options.baudRate || DEFAULT_BAUD_RATE,
    dataBits: options.dataBits || DEFAULT_DATA_BITS,
    parity: options.parity || DEFAULT_PARITY,
    stopBits: options.stopBits || DEFAULT_STOP_BITS,
    autoOpen: options.autoOpen === false ? false : true,
    lock: options.lock === false ? false : true,
		commandPath: options.commandPath || __dirname+'/commands',
		responsePath: options.responsePath || __dirname+'/responses',
  };
  this.path = null;
  this.parser = null;
  this.serial = null;
	this.commands = new CommandBuilder();
	this.commands.loadCommands(options.commandPath);

	this.responses = new ResponseBuilder();
	this.responses.loadResponses(options.responsePath);

  Object.defineProperty(this, 'isOpen', { get: () => { return this.serial && this.serial.isOpen; } });
	if (options.path && this.options.autoOpen) {
		this.open(options.path);
	}
};
util.inherits(Zigate, EventEmitter);

Zigate.prototype.open = function(path, callback) {
  if (!this.serial) {
    this.path = path;
    this.serial = new SerialPort(this.path, this.options, (err) => {
      if (!err) {
        this.parser = this.serial.pipe(new SerialPort.parsers.Delimiter({ delimiter: [FRAME_STOP] }));
        this.parser.on('data', this.onFrameReceived);

        this.serial.on('error', (err) => { this.onError(err, /*autoclose*/ false); });
        this.serial.on('close', () => { this.emit('close'); });

	if (callback) callback();
	this.emit('open');
      }
      else {
	this.serial = null;
        this.onError(err);
	if (callback) process.nextTick(callback, err);
      }
    });
  }
  else {
    // Zigate instance was already connected to same port ; no-op.
    if (this.serial && this.isOpen && this.path === path ) {
			if (callback) process.nextTick(callback);
			return;
    }
    else {
			// <=> ( this.serial && (!this.serial.isOpen || this.path !== path) )
      this.close((err) => {
        if (err) {
					if (callback) callback(err);
        } else {
          this.open(path, callback);
        }
      });
    }
  }
};

Zigate.prototype.close = function(callback) {
  if (this.serial && this.serial.isOpen) {
    console.log("[Zigate] closing connexion to '"+this.path+"'...");
    this.serial.close((err) => {
      if (!err) {
        this.emit('close');
        this.serial = null;
        this.parser = null;
        this.path = null;
      }
			else {
        this.emit('error', err);
			}
			if (callback) callback(err);
    });
  }
  else {
		if (callback) process.nextTick(callback, error);
  }
};


Zigate.prototype.unescape = function(data) {
		var decodedLength = 0;
		var decodedData = Buffer.alloc(data.length);
		var i=0;
		while (i<data.length) {
			if (data[i] === FRAME_ESCAPE && ((i+1)<data.length)) {
				decodedData[decodedLength++] = data[++i] ^ FRAME_ESCAPE_XOR;
			}
			else {
				decodedData[decodedLength++] = data[i];
			}
			i++;
		}
		return decodedData.slice(0, decodedLength);
};

Zigate.prototype.escape = function(data) {
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
};


Zigate.prototype.onFrameReceived = function(data) {
		console.log("[Zigate] raw data:      ", data.toString('hex').replace(/../g, "$& "));
		data = this.unescape(data);
		console.log("[Zigate] unescaped data: "+data.toString('hex').replace(/../g, "$& ") );

    if (!data[0] === FRAME_START) {
      this.onError(new Error("[Zigate] corrupted frame received: invalid 'frame_start' character: ",data[0]," instead of "+FRAME_START+". Skipping. ", data), /*autoclose*/ false);
    }
		if (data.length < 8) {
      this.onError(new Error("[Zigate] corrupted frame received: less than 8 bytes long ("+data.length+" bytes). ",  data), /*autoclose*/ false);
		}
		if (data[data.length-1] !== FRAME_STOP) {
      this.onError(new Error("[Zigate] corrupted frame received: invalid 'frame_stop' character:  ("+data[data.length-1]+") instead of "+FRAME_STOP+". Skipping. ",  data), /*autoclose*/ false);
		}

		let type = data.readUInt16BE(1);
		let length = data.readUInt16BE(3);
		let checksum = data.readUInt16BE(5);
		let payload = data.slice(6, data.length-1);
		let rssi = data[data.length-2];

		if (payload.length !== length) {
      this.onError(new Error("[Zigate] corrupted frame received: inconsistent frame length attribute ("+length+") vs. payload length ("+payload.length+"). ",  data), /*autoclose*/ false);
		}

		var data = {
				type: type,
				checksum: checksum,
				payload: payload,
		};
		console.log("[Zigate] frame parsed: "+JSON.stringify(data));
		this.emit('data', data);

		var response = this.responses.parse(type, payload);
		if (response) {
			console.log("[Zigate] response built: "+JSON.stringify(response));
			this.emit('response', response);
		}
		else {
			this.onError(new Error("[Zigate] unrecognized response received (type="+data.type+")."), /*autoclose*/ false);
		}
};


Zigate.prototype.send = function(name, options) {
	if (!this.isOpen) throw new Error("Zigate not connected yet.");

	var command = this.commands.build(name, options);


	var data = Buffer.alloc(command.payload.length+5);
	data.writeUInt16BE(command.type, 0);
	data.writeUInt16BE(command.payload.length, 2);

	var checksum = 0x00
	checksum ^= command.type >> 8;
	checksum ^= command.type %256;
	checksum ^= command.payload.length >> 8;
	checksum ^= command.payload.length %256;
	var i = 5;
	for (const b of command.payload) {
		data[i++] = b;
		checksum ^= b;
	}
	data.writeUInt8(checksum, 4);

  console.log("[Zigate] sending frame: 01 "+data.toString('hex').replace(/../g, "$& ")+ "03");
  console.log("[Zigate] sending escaped frame: 01 "+this.escape(data).toString('hex').replace(/../g, "$& ")+"03");

  this.serial.write([FRAME_START]);
  this.serial.write(this.escape(data));
  this.serial.write([FRAME_STOP]);

};

Zigate.list = function(callback) {
  console.log("[Zigate] retrieving list of available serial devices");
  return SerialPort.list((err, ports) => {
    if (!err) {
			console.log("[Zigate] "+ports.length+" serial devices found.");
      // discard logical tty, like /dev/ttyS1
      ports = ports.filter((p) => { return p.productId; });
    }
		else {
			console.error("[Zigate] error while retrieving list of serial devices: ", err);
		}
    if (callback) callback(err,ports);
  });

  /* ports example (linux):
  [
    { comName: '/dev/ttyACM0',
      manufacturer: 'Arduino (www.arduino.cc)',
      serialNumber: '752303138333518011C1',
      pnpId: 'usb-Arduino__www.arduino.cc__0043_752303138333518011C1-if00',
      locationId: undefined,
      productId: '0043',
      vendorId: '2341'
    },
    {
      ...
    }
  ]
	*/
};


Zigate.prototype.onError = function(err, autoclose) {
		console.error("[Zigate] ERROR: ", err);
    process.nextTick(this.emit.bind(this,'error', err));
    if (autoclose && this.serial && this.serial.isOpen) {
      this.serial.close();
    }
};





module.exports = Zigate;
