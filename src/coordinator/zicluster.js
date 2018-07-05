let ZiAttribute = require('./ziattribute.js');
const EventEmitter = require('events').EventEmitter;
let ZiCommand = require('./zicommand.js');
let Enum = require('../driver/enum.js');

class ZiCluster extends EventEmitter {
    constructor(id, endpoint) {
      this.id = id;
      this.endpoint = endpoint;
      this.hex = (("0000"+Number(this.id).toString(16)).substr(-4,4));
      this.type = Enum.CLUSTERS(id);
      this.attributes = {};
      this.commands = {};

    }
    toString() {
      return (""+this.type || "[cluster_0x"+this.id.toString(16)+",notype]");
    }

    getAttribute(id) {
      return this.attributes[id];
    }
    addAttribute(id) {
      if (!this.attributes[id]) {
        this.attributes[id] = new ZiAttribute(id, this);
        ZiCluster.LOGS.log(""+this.endpoint.device+""+this.endpoint+""+this+""+this.attributes[id]+": created");
				this.emit('attribute_add', this.attributes[id]);
				this.endpoint.emit('attribute_add', this.attributes[id]);
				this.endpoint.device.emit('attribute_add', this.attributes[id]);
				this.endpoint.device.coordinator.emit('attribute_add', this.attributes[id]);
      }
      return this.attributes[id];
    }
    refreshAttribute(attributeId) {
      return this.endpoint.refreshAttribute(this.id, attributeId);
    }
    writeAttribute(attributeid, value) {
      return this.endpoint.writeAttribute(this.id, attributeid, value);
    }

    getCommand(id) {
      return this.commands[id];
    }
    addCommand(id) {
      if (!this.commands[id]) {
        this.commands[id] = new ZiCommand(id, this);
        ZiCluster.LOGS.log(""+this.endpoint.device+""+this.endpoint+""+this+""+this.commands[id]+": created");
				this.emit('command_add', this.commands[id]);
				this.endpoint.emit('command_add', this.commands[id]);
				this.endpoint.device.emit('command_add', this.commands[id]);
				this.endpoint.device.coordinator.emit('command_add', this.commands[id]);

      }
      return this.commands[id];
    }
}

ZiCluster.LOGS = {
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = ZiCluster;
