const Sym = require('./symbols.js');
var Path = require("path");
var Fs = require("fs");

class DeviceTypes {
  constructor(coordinator, options) {
		this[Sym.COORDINATOR] = coordinator;
    this[Sym.LOG] = (coordinator.log.getLogger && coordinator.log.getLogger('devicetypes') || coordinator.log);
		this.devices = {};
		this.typesPath = options.devicetypes || Path.join(__dirname, '../../devices');
		this.types = this.loadTypesDefinitions(this.typesPath);

		this.coordCallbacks = {
			started: () => {},
			stopped: () => {},
			reset: () => {},
			device_add: (device) =>       { this.onDeviceAdded(device);       },
			device_remove: (device) =>    { this.onDeviceRemoved(device);     },
			endpoint_add: (endpoint) =>   { this.onEndpointAdded(endpoint);   },
			cluster_add: (cluster) =>     { this.onClusterAdded(cluster);     },
			attribute_add: (attribute) => { this.onAttributeAdded(attribute); },
			command_add: (command) =>     { this.onCommandAdded(command);     },
			attribute_change: (attribute, newval, oldval) => { this.onAttributeChanged(attribute, newval, oldval);  },
		}
		Object.entries(this.coordCallbacks).forEach(([name, fn]) => this[Sym.COORDINATOR].on(name, fn));
  }
	
	loadTypesDefinitions(path) {
		let types = {};
    let filenames = Fs.readdirSync(path).sort();
    if (!filenames.length) throw new Error("error while loading profiles in '"+path+"'.");
		
		filenames.forEach((filename) => {
			try {
				let typedef = require(Path.resolve(path, filename));
				typedef.id = typedef.id || Path.basename(filename, '.js');
				typedef.name = typedef.name || filename;
				typedef.toString = typedef.toString || function() { return '[type_'+this.id+']'; };
				types[typedef.id] = typedef;
			}
			catch(e) {
				this.log.error("error while loading device type '"+filename+"':",e);
			}
		});
		this.log.debug("finished loading "+Object.keys(types).length+" types from '"+path+"': "+(Object.keys(types).join(',')));
		return types;
	}
	
	onDeviceAdded(device) {
		this.log.trace("catched device add "+device+"");
		this.getBestDeviceType(device);
		this.devices[device.address] = device;
	}
	onDeviceRemoved(device) {
		this.removeTypeFromDevice(device);
		delete this.devices[device.address];
	}
	onEndpointAdded(endpoint) {
		let device = endpoint.device;
		let type = device[Sym.TYPE];
		if (type && type['endpoint_add']) type['endpoint_add'](endpoint);
	}
  onClusterAdded(cluster) {
		let device = cluster.device;
		let type = device[Sym.TYPE];
		if (type && type['cluster_add']) type['cluster_add'](cluster);
	}
	onAttributeAdded(attribute) {
		let device = attribute.device;
		let type = device[Sym.TYPE];
		if (type && type['attribute_add']) type['attribute_add'](attribute);
	}
	onCommandAdded(command) {
		let device = command.device;
		let type = device[Sym.TYPE];
		if (type && type['command_add']) type['command_add'](command);
	}
	onAttributeChanged(attribute, newval, oldval) {
		let device = command.device;
		let type = device[Sym.TYPE];
		if (type && type['attribute_change']) type['attribute_change'](attribute, newval, oldval);
	}

	getBestDeviceType(device) {
		let besttype = DeviceTypes.Default
		let bestscore = besttype.match(device);
		
		Object.values(this.types).forEach((typedef) => {
			let score = typedef.match(device);
			if (score && score > bestscore) {
				besttype = typedef;
				bestscore = score;
			}
		});
		this.log.trace("getBestDeviceType("+device+") matched type '"+besttype+"'.");
		if (!device[Sym.TYPE] || device[Sym.TYPE].id !== besttype.id) {
			this.log.debug("upgrading "+device+" from type "+device[Sym.TYPE]+" to "+besttype+' (score='+bestscore+')...');
			this.assignTypeToDevice(besttype, device);
		}
	}
	
	removeTypeFromDevice(device) {
		let typedef = device[Sym.TYPE];
		if (typedef) {
			if (typedef['type_remove']) typedef['type_remove'](device);
			device[Sym.TYPE] = null;
			this.log.trace("type "+typedef+"' removed from "+device);
		}
	}
	
	assignTypeToDevice(newtype, device) {
		let oldtype = device[Sym.TYPE];
		if (oldtype && oldtype.id !== newtype.id) removeTypeFromDevice(device);

		if (newtype) {
			this.log.debug("setting up type "+newtype+" to "+device);
			if (newtype['type_add']) newtype['type_add'](device);
		}
	}
	
  get log() { return this[Sym.LOG]; }
	toString() { return "[DeviceTypes-"+Object.keys(this.types).length+"]"; }
}

DeviceTypes.Default = {
	match: function(device) {
		return Number.MIN_SAFE_INTEGER;
	}
	
}

module.exports = DeviceTypes;
