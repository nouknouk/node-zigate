const EventEmitter = require('events').EventEmitter;
var Path = require("path");
var fs = require("fs");

const Equipment = require('./equipment.js');


class EquipmentManager extends EventEmitter {
  constructor(coordinator, options) {
    super();
		this.coordinator = coordinator;
		this.equipments = {};
		this.profiles = this.loadProfiles();
		this.profilesPath = options.profiles || Path.resolve(__dirname, '../../', 'profiles');

		this.coordCallbacks = {
			started: () => {},
			stopped: () => {},
			reset: () => {},
			device_add: (device) => { this.onDeviceAdded(device); },
			device_remove: (device) => { this.onDeviceRemoved(device); },
			
		}
		Object.entries(this.coordCallbacks).forEach(([name, fn]) => this.coordinator.on(name, fn));
		
		
  }
	
  static get logger() { return EquipmentManager.LOGS; };

	
	onDeviceAdded(device) {
		this.logger.debug("[EquipmentManager] device added ("+device+")");

		this.profile = null;
		this.equipments[device.address] = new Equipment(this, device, profile);
	}
	onDeviceRemoved(device) {
		this.logger.debug("[EquipmentManager] device removed ("+device+")");

		this.equipments[device.address].destroy();
		delete this.equipments[device.address];
	}

	loadProfiles() {
    let filenames = fs.readdirSync(this.profilesPath).sort();
    if (!filenames.length) throw new Error("error while loading profiles in '"+this.profilesPath+"'.");
		
		filenames.forEach((filename) => {
			try {
				let profile = require(Path.resolve(this.profilesPath, filename);
				this.profiles[filename] = profile;
			}
			catch(e) {
				this.logger.error("error while loading profile '"+filename+"':",e);
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
