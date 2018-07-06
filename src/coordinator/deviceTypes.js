const Sym = require('./ziymbols.js');
var Path = require("path");
var Fs = require("fs");

const Equipment = require('./equipment.js');


class DeviceTypes {
  constructor(coordinator, options) {
    super();
		this[Sym.COORDINATOR] = coordinator;
		this.equipments = {};
		this.profiles = this.loadProfiles();
		this.typesPath = options.devicetypes || Path.resolve(__dirname, '../../devices');

		this.coordCallbacks = {
			started: () => {},
			stopped: () => {},
			reset: () => {},
			device_add: (device) => { this.onDeviceAdded(device); },
			device_remove: (device) => { this.onDeviceRemoved(device); },
			
		}
		Object.entries(this.coordCallbacks).forEach(([name, fn]) => this[Sym.COORDINATOR].on(name, fn));
		
		
  }
	
  static get logger() { return EquipmentManager.LOGS; };

	
	onDeviceAdded(device) {
		this[Sym.LOG]ger.debug("[EquipmentManager] device added ("+device+")");

		this.profile = null;
		this.equipments[device.address] = new Equipment(this, device, profile);
	}
	onDeviceRemoved(device) {
		this[Sym.LOG]ger.debug("[EquipmentManager] device removed ("+device+")");

		this.equipments[device.address].destroy();
		delete this.equipments[device.address];
	}

	loadProfiles() {
    let filenames = Fs.readdirSync(this.typesPath).sort();
    if (!filenames.length) throw new Error("error while loading profiles in '"+this.typesPath+"'.");
		
		filenames.forEach((filename) => {
			try {
				let profile = require(Path.resolve(this.typesPath, filename);
				this.profiles[filename] = profile;
			}
			catch(e) {
				this[Sym.LOG]ger.error("error while loading profile '"+filename+"':",e);
			}
		});
	}
	
	
	toString() { return "EquipmentManager-"+Object.keys(equipments).length+"]"; }
}

EquipmentManager.LOGS = { 
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = EquipmentManager;
