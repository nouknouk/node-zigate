var EventEmitter = require('events').EventEmitter;
var util = require('util');
var SerialPort = require('serialport');

var DEFAULT_PATH = '/dev/usbTTY0';
var DEFAULT_BAUD_RATE = 115200;
var DEFAULT_DATA_BITS = 8;
var DEFAULT_PARITY = 'none'; /* one of 'none', 'even', 'mark', 'odd', 'space' */
var DEFAULT_STOP_BITS = 1; /* 1 or 2 */

var FRAME_START = '\x01';
var FRAME_STOP = '\x03';

/*
	|   1   |   2   |   3   |   4   |   5   |   6   |      n+6     |  n+7  |  n+8  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| Start |    MSG TYPE   |    LENGTH     | CHKSM |      DATA    | RSSI  | STOP  |
	|-------|---------------|---------------|-------|--------------|-------|-------|
	| 0x01  |               |       n       |       |              |       | 0x03  |

	for every byte between 0x00 and 0x10, it must be replaced by an escape sequence: [0x02, XOR(byte)]
	example: 0x06 becomes [0x02, 0x16]
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
  };
  this.path = null;
  this.parser = null;
  this.serial = null;
  Object.defineProperty(this, 'isOpen', { get: () => { return this.serial && this.serial.isOpen; } });
};
util.inherits(Zigate, EventEmitter);

Zigate.prototype.open = function(path) {
  if (!this.serial) {
    this.path = path;
    this.serial = new SerialPort(this.path, this.options, (err) => {
      if (!err) {
        this.parser = this.serial.pipe(new Delimiter({ delimiter: [FRAME_STOP] }));
        this.parser.on('data', this.onFrameReceived);

        this.serial.on('error', (err) => { this.onError(err); });
        this.serial.on('open', () => { this.emit('open'); });
        this.serial.on('close', () => { this.emit('close'); });
      }
			else {
        this.onOpenError(err);
				this.serial = null;
			}
    });
  }
  else {
    // Zigate instance was already connected to another port ; close it first.
    if (this.serial && this.path === path) {
      process.nextTick(this.emit, 'open');
    }
    else {
      var self = this;
      var cb = callback;
      var p = path;
      this.close((err) => {
        if (err) {
          this.onOpenError(err);
        } else {
          this.open(p, cb);
        }
      });
    }
  }
};

Zigate.prototype.close = function() {
  if (this.serial && this.serial.isOpen) {
    console.log("[Zigate] closing connexion");
    this.serial.close((err) => {
      if (!err) {
        process.nextTick(this.emit, 'close');
        this.serial = null;
        this.parser = null;
        this.path = null;
      }
    });
    return true;
  }
  else {
    return false;
  }
};

Zigate.prototype.send = function(command) {
  command = command || {};
  command.type = command.type || '\x00\x00';
  command.length = command.length || '\x00\x00';
  command.checksum = command.checksum || '\x00';
  command.payload = command.payload || '\x00';
  command.rssi = command.rssi || '\x00';
  console.log("[Zigate] sending frame");
  // TODO: implement this, boy !
  this.serial.write(FRAME_START);
  this.serial.write(command.type);
  this.serial.write(command.length);
  this.serial.write(command.checksum);
  this.serial.write(command.rssi);
  this.serial.write(FRAME_STOP);
};

Zigate.prototype.onFrameReceived = function(data) {
		console.log("Zigate frame received ("+typeof(data)+"): ", data);
    if (data[0] === FRAME_START) {

    }
    else {
      this.emit('error', new Error("invalid 'frame_start' character found: "+data.charCodeAt(0)+" instead of "+FRAME_START.charCodeAt(0)+". Skipping."));
    }
};



Zigate.list = function(callback) {
  // this.serial.write('ROBOT PLEASE RESPOND\n');
  console.log("[Zigate] retrieving list of available serial devices");
  return SerialPort.list((err, ports) => {
    if (!err) {
      // discard logical tty, like /dev/ttyS1
      ports = ports.filter((p) => { return p.productId; });
    }
    callback/*(err, ports)*/);
    /* linux example:
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
    ] */
};


Zigate.prototype.onError = function(err) {
		console.log("Zigate serial communication issue: ", err);
    this.emit('error', err);
    if (this.serial && this.serial.isOpen) {
      this.serial.close();
    }
};

Zigate.prototype.onOpenError = function(err) {
  process.nextTick(this.emit, 'error', err);
};




module.exports = Zigate;
