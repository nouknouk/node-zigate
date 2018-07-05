const EventEmitter = require('events').EventEmitter;
const CLUSTER = Symbol("CLUSTER");

class ZiCommand extends EventEmitter {
  constructor(id, cluster) {
    this.id = id;
    this.hex = (("0000"+Number(this.id).toString(16)).substr(-4,4));
    this.cluster = cluster || null;
		this.type = (this.cluster && this.cluster.type && this.cluster.type.commands && this.cluster.type.commands[id]) || null;
  }
  get log() { return ZiCommand.LOGS; }
	get cluster() { return this.cluster; }

  toString() { return "[command_0x"+this.id.toString(16)+"]"; }
}

ZiCommand.LOGS = { trace: () => {}, debug: () => {}, log: () => {}, warn: () => {}, error: () => {} };

module.exports = ZiCommand;
