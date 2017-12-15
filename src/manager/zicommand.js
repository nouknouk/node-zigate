const CLUSTER = Symbol("CLUSTER");

class ZiCommand {
  constructor(id, cluster) {
    this.id = id;
    this[CLUSTER] = cluster || null;
		
		/*
    this.commandDef = null;
    if (this.cluster && this.cluster.clusterDef) {
      this.commandDef = this.cluster.clusterDef.properties[id] || null;
    }
    this.value = (this.commandDef && this.commandDef.default) || null;
		*/
		
  }
	get cluster() { return this[CLUSTER]; }
	
  toString() { return "[command_0x"+this.id.toString(16)+"]"; }
}

ZiCommand.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ZiCommand;
