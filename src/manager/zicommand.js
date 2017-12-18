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

ZiCommand.LOGS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },	
};
module.exports = ZiCommand;
