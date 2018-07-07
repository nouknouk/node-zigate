const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
const CLUSTER = Symbol("CLUSTER");

class ZiCommand extends EventEmitter {
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

module.exports = ZiCommand;
