const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class ZiAttribute extends EventEmitter {
  constructor(id, cluster, value, verified) {
		super();
    this[Sym.ID] = id;
    this[Sym.CLUSTER] = cluster;
    this[Sym.TYPE] = (cluster && cluster.type && cluster.type.attributes && cluster.type.attributes[id]) || null;
		this[Sym.ATTR_DATA] = (typeof(value) !== 'undefined') ? value : ((this.type && typeof(this.type['default']) !== "undefined" && this.type['default']) || null);
		this[Sym.VERIFIED] = !!verified;
  }

	get id() { return this[Sym.ID]; }
  get hex() { return "0x"+(("0000"+Number(this.id).toString(16)).substr(-4,4)); }
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

  [Sym.SET_ATTR_DATA](newVal) {
    let oldval = this[Sym.ATTR_DATA];
    this[Sym.ATTR_DATA] = newVal;
    this.log.debug(""+this.device+this.cluster+this+" data changed("+JSON.stringify(this[Sym.ATTR_DATA])+")");
    this.emit('attribute_change', this, newVal, oldval);
  }

  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return "[attr_"+((this.type && this.type.name) || '')+"("+this.hex+")]"; }
  inspect() { return this.toString()+" = "+JSON.stringify(this[Sym.ATTR_DATA]); }
}

module.exports = ZiAttribute;
