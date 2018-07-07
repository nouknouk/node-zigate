const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class ZiAttribute extends EventEmitter {
  constructor(id, cluster, value, verified) {
		super();
    this[Sym.ID] = id;
    this[Sym.CLUSTER] = cluster;
    this[Sym.TYPE] = (cluster && cluster.type && cluster.type.attributes && cluster.type.attributes[id]) || null;
		this[Sym.ATTR_DATA] = (typeof(value) !== 'undefined' && value) || (this.type && typeof(this.type['default']) !== "undefined" && this.type['default']) || null;
		this[Sym.VERIFIED] = !!verified;
  }

	get id() { return this[Sym.ID]; }
	get type() { return this[Sym.TYPE]; }
	get value() { return this[Sym.ATTR_DATA]; }
	get cluster() { return this[Sym.CLUSTER]; }
	get endpoint() { return this[Sym.CLUSTER][Sym.ENDPOINT]; }
	get device() { return this[Sym.CLUSTER][Sym.ENDPOINT][Sym.DEVICE]; }
	get verified() { return this[Sym.VERIFIED]; }
	set verified(v) { return this[Sym.VERIFIED] = v; }

  refresh() {
		return this.device[Sym.COORDINATOR].refreshAttribute(this);
  }
  write(value) {
		return this.device[Sym.COORDINATOR].writeAttribute(this, value);
  }

  [Sym.SET_DATA](newVal) {
    this[Sym.ATTR_DATA] = newVal;
    this.log.debug(""+this.device+this.cluster+this.attribute+" value changed("+this.value+")");
  }

  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "notype")+"]"; }
}

module.exports = ZiAttribute;
