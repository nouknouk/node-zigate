ZiAttribute = require('./ziattribute.js');
ZiCommand = require('./zicommand.js');

class ZiCluster {
    constructor(id, endpoint) {
      this.id = id;
      this.endpoint = endpoint;
      this.clusterDef = ZiCluster.Definitions.getClusterDef(id);
      this.attributes = {};
      this.commands = {};
			
    }
    toString() {
      return "[cluster_0x"+this.id.toString(16)+"," + ((this.clusterDef && this.clusterDef.name) || "unknown")+"]";
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
}

ZiCluster.Definitions = require('./ziclusterDefinitions.js');

ZiCluster.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ZiCluster;
