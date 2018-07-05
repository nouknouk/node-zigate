const EventEmitter = require('events').EventEmitter;

const DEVICE_CALLBACKS = Symbol('deviceCallbacks');
const ZIDEVICE = Symbol('zidevice');
const MANAGER = Symbol('manager');
const VALUES = Symbol('value');
const ACTIONS = Symbol('actions');
const PROFILE = Symbol('actions');
const SETUP_PROFILE = Symbol('setup_profile');
const REMOVE_PROFILE = Symbol('remove_profile');
const DESTROY = Symbol('destroy');
const MAPPING_TO_ATTRIBUTE = Symbol('MAPPING_TO_ATTRIBUTE');
const MAPPING_TO_COMMAND = Symbol('MAPPING_TO_COMMAND');

class Equipment extends EventEmitter {
  constructor(manager, zidevice, profile) {
    super();
		this[MANAGER] = manager;
		this[ZIDEVICE] = zidevice;

		this[PROFILE] = null;
		this[VALUES] = {};
		this[ACTIONS] = {};

		this[DEVICE_CALLBACKS] = {
			endpoint_add: (endpoint) => {
        if (this[PROFILE]) {
          let fullid = endpoint.hex;
          if (this[PROFILE]['endpoint_add']) this[PROFILE]['endpoint_add'].apply(this, endpoint);
          if (this[PROFILE]['endpoint_add_'+fullid]) this[PROFILE]['endpoint_add_'+fullid].apply(this,endpoint);
        }
      },
			cluster_add: (cluster) => {
        if (this[PROFILE]) {
          let fullid = cluster.endpoint.hex+"_"+cluster.hex;
          if (this[PROFILE]['cluster_add']) this[PROFILE]['cluster_add'].apply(this, cluster);
          if (this[PROFILE]['cluster_add_'+fullid]) this[PROFILE]['cluster_add_'+fullid].apply(this,cluster);
        }
      },
			attribute_add: (attribute) => {
        if (this[PROFILE]) {
          let fullid = attribute.cluster.endpoint.hex+"_"+attribute.cluster.hex+"_"+attribute.hex;
          if (this[PROFILE]['attribute_add']) this[PROFILE]['attribute_add'].apply(this, attribute);
          if (this[PROFILE]['attribute_add_'+fullid]) this[PROFILE]['attribute_add_'+fullid].apply(this,attribute);
        }
      },
			command_add: (command) => {
        if (this[PROFILE]) {
          let fullid = command.cluster.endpoint.hex+"_"+command.cluster.hex+"_"+command.hex;
          if (this[PROFILE]['command_add']) this[PROFILE]['command_add'].apply(this, command);
          if (this[PROFILE]['command_add_'+fullid]) this[PROFILE]['command_add_'+fullid].apply(this,command);
        }
      },
			attribute_change: (attribute, newVal, oldVal) => {
        if (this[PROFILE]) {
          let fullid = attribute.cluster.endpoint.hex+"_"+attribute.cluster.hex+"_"+attribute.hex;
          if (this[PROFILE]['attribute_change']) this[PROFILE]['attribute_change'].apply(this, attribute, newVal, oldVal);
          if (this[PROFILE]['attribute_change_'+fullid]) this[PROFILE]['attribute_change_'+fullid].apply(this, attribute, newVal, oldVal);
        }
      },
		};
		Object.entries(this[DEVICE_CALLBACKS]).forEach(([name, fn]) => this[ZIDEVICE].on(name, fn));

    this.setProfile(profile);
  }

  static get logger() { return Equipment.LOGS; };

  setProfile(profile) {

    // remove old profile
    if (this[PROFILE] !== null) {
      this.removeProfile(profile);
      if (this[PROFILE]['profile_unset']) this[PROFILE]['profile_unset'].apply(this);
      this[VALUES] = {};
      this[ACTIONS] = {};
    }

    // setup new profile
    this[PROFILE] = profile;
    if (this[PROFILE] !== null) {

      if (profile.values) {
        Object.entries(profile.values).forEach(([name, def]) => {
          let val = Object.assign(def, {});
          val[VALUE] = def.value || undefined;
          this[VALUES][name] = val;

        });
      }
      if (profile.actions) {
        Object.entries(profile.actions).forEach(([name, def]) => {
          let val = Object.assign(def, {});
          this[ACTIONS][name] = val;
        });
      }
      if (this[PROFILE]['profile_set']) this[PROFILE]['profile_set'].apply(this);
    }
  }

  get(name) {
    let valueobj = this[VALUES][name];
    if (!valueobj) throw new Error("invalid value name '"+name+"'");
    return valueobj[VALUE];
  }

  set(name, val) {
    let valueobj = this[VALUES][name];
    if (!valueobj) throw new Error("'"+name+"' is a readonly value");
    else if (valueobj.readonly) throw new Error("'"+name+"' is a readonly value");

    if (valueObj.set) {
      try {
        val = valueObj.set(val);
      }
      catch (e) {
        // value set aborted by setter.
        return Promise.reject(e);
      }
    }

    let p = Promise.resolve();

    if (valueObj.mapping) {
      let [endpointId, clusterId, attributeID, attr] = this[MAPPING_TO_ATTRIBUTE](valueObj.mapping);
      p = p.then(() => {
        return this.sendCommand('attribute_write', { address:this[ZIDEVICE].address,
          endpoint: endpointId,
          cluster: clusterId,
          attribute: attributeId,
          value: val,
        });
      });
    }
    p = p.then(() => {
      valueObj[VALUE] = val;
      return val;
    });
    return p;
  }

  exec(actionname) {
    let actionobj = this[ACTIONS][name];
    if (actionobj) {
      throw "not implemented yet.";
    }
  }

  sendCommand(command, params) {
    return this.manager.sendCommand(command, params);
  }

  [REMOVE_PROFILE](profile) {

  }
	[DESTROY]() {
		Object.entries(this[DEVICE_CALLBACKS]).forEach(([name, fn]) => { this[ZIDEVICE].removeListener(name, fn); });
		this[MANAGER] = null;
		this[ZIDEVICE] = null;
		this[PROFILE] = null;
		this[VALUES] = null;
		this[ACTIONS] = null;
	}

  [MAPPING_TO_ATTRIBUTE](mapping) {
    if (!mapping) return null;
    let res = /^\W*(?:endpoint\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W+(?:cluster\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W+(?:attribute\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W*$/gi.match(mapping);
    if (!res) throw "invalid mapping syntax '"+mapping+"'";
    let endpointId = parseInt('0x'+res[1]);
    let clusterId = parseInt('0x'+res[2]);
    let attributeId = parseInt('0x'+res[3]);
    return [endpointId, clusterId, attributeId, this[ZIDEVICE] && this[ZIDEVICE].endpoints[endpointId] && this[ZIDEVICE].endpoints[endpointId].clusters[clusterId] && this[ZIDEVICE].endpoints[endpointId].clusters[clusterId].attributes[attributeId] ];
  }
  [MAPPING_TO_COMMAND](mapping) {
    if (!mapping) return null;
    let res = /^\W*(?:endpoint\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W+(?:cluster\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W+(?:command\W+)?(?:0x)?([0-9a-fA-f]{1,4})\W*$/gi.match(mapping);
    if (!res) throw "invalid mapping syntax '"+mapping+"'";
    let endpointId = parseInt('0x'+res[1]);
    let clusterId = parseInt('0x'+res[2]);
    let commandId = parseInt('0x'+res[3]);
    return [endpointId, clusterId, commandId, this[ZIDEVICE] && this[ZIDEVICE].endpoints[endpointId] && this[ZIDEVICE].endpoints[endpointId].clusters[clusterId] && this[ZIDEVICE].endpoints[endpointId].clusters[clusterId].commands[commandId] ];
  }


	toString() { return "Equipment_0x"+this.address.toString(16)+"]"; }
}

Equipment.LOGS = {
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = Equipment;
