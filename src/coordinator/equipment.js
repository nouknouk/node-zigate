const EventEmitter = require('events').EventEmitter;
const Equipment = require('./equipment.js');

class Equipment extends EventEmitter {
  constructor(manager, device, profile) {
    super();
		this.manager = manager;
		this.device = device;

		this.profile = profile;
		this.values = {};
		this.actions = {};
		
		this.deviceCallbacks = {
			endpoint_add: () => {},
			cluster_add: () => {},
			attribute_add: () => {},
			command_add: () => {},
			attribute_change: () => {},
		};
		Object.entries(this.deviceCallbacks).forEach(([name, fn]) => this.device.on(name, fn));
  }
	
  static get logger() { return Equipment.LOGS; };

	destroy() {
		Object.entries(this.deviceCallbacks).forEach(([name, fn]) => this.device.removeListener(name, fn));
		this.manager = null;
		this.device = null;
		this.profile = null;
		this.values = null;
		this.actions = null;
	}
	
	toString() { return "Equipment_0x"+this[Sym.ADDRESS].toString(16)+"]"; }
}

Equipment.LOGS = { 
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = Equipment;
