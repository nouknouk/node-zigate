const EventEmitter = require('events').EventEmitter;
var Path = require("path");
var fs = require("fs");

const Equipment = require('./equipment.js');


class EquipmentManager extends EventEmitter {
  constructor(coordinator, options) {
    super();
    options = options || {};

		this.coordinator = coordinator;
		this.equipments = {};
		this.profiles = null;
		this.profilesPath = options.profiles || Path.join(__dirname, '../../', 'profiles');
		this.coordCallbacks = {
			started: () => {},
			stopped: () => {},
			reset: () => {},
			device_add: (device) => { this.onDeviceAdded(device); },
			device_remove: (device) => { this.onDeviceRemoved(device); },
      device_spec: (device) => { onDeviceSpec(device); },
		}
		Object.entries(this.coordCallbacks).forEach(([name, fn]) => this.coordinator.on(name, fn));


  }

  get logger() { return EquipmentManager.LOGS; };


	onDeviceAdded(device) {
		this.logger.debug("[EquipmentManager] device added ("+device+")");

    let equipment = new Equipment(this, device, null /*no profile*/);
		this.equipments[device.address] = equipment;
	}
	onDeviceRemoved(device) {
		this.logger.debug("[EquipmentManager] device removed ("+device+")");

		this.equipments[device.address].destroy();
		delete this.equipments[device.address];
	}
  onDeviceSpec(device) {
    Object.values(this.profiles).forEach((p) => {
      let bestprofile = { id: 'noprofile' };
      let bestscore = Number.MIN_SAFE_INTEGER
      if (p.match) {
        let score = p.match.apply(device);
        if (scope >= bestscore) {
          bestscore = score;
          bestprofile = profile;
        }
      }
    });
    if (!this.equipments[device.address].profile || this.equipments[device.address].profile.id !== bestprofile.id) {
      this.equipments[device.address].setProfile(profile);
    }
  }

  loadProfiles() {
    this.logger.log("[EquipmentManager] loadProfiles('"+this.profilesPath+"')...");

    this.profiles = {};

    let filenames = fs.readdirSync(this.profilesPath).sort();
    if (!filenames.length) throw new Error("error while loading profiles in '"+this.profilesPath+"'.");

		filenames.forEach((filename) => {
			try {
				let profile = require(Path.resolve(this.profilesPath, filename));
				profile.id = profile.id || Path.basename(filename).split(Path.sep)[0];
				this.profiles[profile.id] = profile;
			}
			catch(e) {
				this.logger.error("error while loading profile '"+filename+"':",e);
			}
		});
	}

  sendCommand(command, params) {
    return this.coordinator.send(command, params);
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
