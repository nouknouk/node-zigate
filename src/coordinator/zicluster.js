let ZiAttribute = require('./ziattribute.js');
let ZiCommand = require('./zicommand.js');
let Enum = require('../driver/enum.js');

class ZiCluster {
    constructor(id, endpoint) {
      this.id = id;
      this.endpoint = endpoint;
      this.type = Enum.CLUSTERS(id);
      this.attributes = {};
      this.commands = {};

    }
    toString() {
      return (""+this.type || "[cluster_0x"+this.id.toString(16)+",notype]");
    }

    getOrCreateAttribute(id) {
      if (!this.attributes[id]) {
        this.attributes[id] = new ZiAttribute(id, this);
        ZiCluster.LOGS.log(""+this.endpoint.device+""+this.endpoint+""+this+""+this.attributes[id]+": created");
      }
      return this.attributes[id];
    }
    getOrCreateCommand(id) {
      if (!this.commands[id]) {
        this.commands[id] = new ZiCommand(id, this);
        ZiCluster.LOGS.log(""+this.endpoint.device+""+this.endpoint+""+this+""+this.commands[id]+": created");
      }
      return this.attributes[id];
    }

    addAttributes(attributeIds) {
      attributeIds.forEach( (attr_id) => {
        this.getOrCreateAttribute(attr_id);
      });
    }
		addCommands(commandIds) {
      commandIds.forEach( (com_id) => {
        this.getOrCreateCommand(com_id);
      });
    }

    refreshAttribute(attributeId) {
      return this.endpoint.refreshAttribute(this.id, attributeId);
    }
    writeAttribute(attributeid, value) {
      return this.endpoint.writeAttribute(this.id, attributeid, value);
    }
}

ZiCluster.LOGS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};

module.exports = ZiCluster;
