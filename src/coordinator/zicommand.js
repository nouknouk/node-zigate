const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
const CLUSTER = Symbol("CLUSTER");

class ZiCommand extends EventEmitter {
<<<<<<< HEAD
  constructor(id, cluster, verified) {
		super();
    this[Sym.ID] = id;
    this[Sym.CLUSTER] = cluster;
		this[Sym.VERIFIED] = !!verified;
    this[Sym.TYPE] = (cluster && cluster.type && cluster.type.attributes && cluster.type.attributes[id]) || null;
  }
	
	get id() { return this[Sym.ID]; }
	get type() { return this[Sym.TYPE]; }
	get cluster() { return this[Sym.CLUSTER]; }
	get endpoint() { return this[Sym.CLUSTER][Sym.ENDPOINT]; }
	get device() { return this[Sym.CLUSTER][Sym.ENDPOINT][Sym.DEVICE]; }
	get verified() { return this[Sym.VERIFIED]; }
	set verified(v) { return this[Sym.VERIFIED] = v; }
	
  exec() {
		return this.device[Sym.COORDINATOR].execCommand(this, arguments);
  }
	
  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "notype")+"]"; }
}

=======
  constructor(id, cluster) {
    super();
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

>>>>>>> 38cd6bd449c3a417c9155d1ce5e54c0d54434138
module.exports = ZiCommand;
