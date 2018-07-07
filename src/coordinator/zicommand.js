const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
const CLUSTER = Symbol("CLUSTER");

class ZiCommand extends EventEmitter {
  constructor(id, cluster, verified) {
		super();
    this[Sym.ID] = id;
    this[Sym.CLUSTER] = cluster;
		this[Sym.VERIFIED] = !!verified;
    this[Sym.TYPE] = (cluster && cluster.type && cluster.type.commands && cluster.type.commands[id]) || null;
  }

	get id() { return this[Sym.ID]; }
  get hex() { return "0x"+(("0000"+Number(this.id).toString(16)).substr(-4,4)); }
	get type() { return this[Sym.TYPE]; }
	get cluster() { return this[Sym.CLUSTER]; }
	get endpoint() { return this[Sym.CLUSTER][Sym.ENDPOINT]; }
	get device() { return this[Sym.CLUSTER][Sym.ENDPOINT][Sym.DEVICE]; }
	get verified() { return this[Sym.VERIFIED]; }
	set verified(v) { return this[Sym.VERIFIED] = v; }

  exec() {
		return this.device[Sym.COORDINATOR].execCommand(this, arguments);
  }
  [Sym.ON_ACTION_EXEC]() {
    this.emit('action_exec', this, [...arguments]);
  }

  get log() { return this.device[Sym.COORDINATOR].log; }
  toString() { return "[command_"+this.type+"_"+this.hex+"]"; }
}

module.exports = ZiCommand;
