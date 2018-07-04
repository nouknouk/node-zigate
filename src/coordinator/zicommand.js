const EventEmitter = require('events').EventEmitter;
const CLUSTER = Symbol("CLUSTER");

class ZiCommand extends EventEmitter {
  constructor(id, cluster) {
    this.id = id;
    this.cluster = cluster || null;
		this.type = (this.cluster && this.cluster.type && this.cluster.type.commands && this.cluster.type.commands[id]) || null;
  }
	get cluster() { return this.cluster; }
	
  toString() { return "[command_0x"+this.id.toString(16)+"]"; }
}

ZiCommand.LOGS = { 
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = ZiCommand;
