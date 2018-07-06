const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class ZiAttribute extends EventEmitter {
<<<<<<< HEAD
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
	
=======
  constructor(id, cluster) {
    super();
    this.id = id;
    this.hex = (("0000"+Number(this.id).toString(16)).substr(-4,4));
    this.cluster = cluster || null;
    this.type = (this.cluster && this.cluster.type && this.cluster.type.attributes && this.cluster.type.attributes[id]) || null;
		this.value = (this.type && typeof(this.type.default) !== "undefined" && this.type.default) || null;
  }
  get log() { return ZiAttribute.LOGS; }
  toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "unknown")+"]"; }

>>>>>>> 38cd6bd449c3a417c9155d1ce5e54c0d54434138
  refresh() {
		return this.device[Sym.COORDINATOR].refreshAttribute(this);
  }
  write(value) {
		return this.device[Sym.COORDINATOR].writeAttribute(this, value);
  }
<<<<<<< HEAD
	
  [Sym.SET_DATA](newVal) {
    this[Sym.ATTR_DATA] = newVal;
    this.log.debug(""+this.device+this.cluster+this.attribute+" value changed("+this.value+")");
=======
  setValue(newVal) {
    let oldVal = this.value;
    this.value = newVal;
    ZiAttribute.LOGS.debug(""+this.cluster.endpoint.device+""+this.cluster.endpoint+""+this.cluster+""+this+": value changed("+this.value+")");
		this.emit('attribute_change', this, newVal, oldVal);
		this.cluster.emit('attribute_change', this, newVal, oldVal);
		this.cluster.endpoint.emit('attribute_change', this, newVal, oldVal);
		this.cluster.endpoint.device.emit('attribute_change', this, newVal, oldVal);
		this.cluster.endpoint.device.coordinator.emit('attribute_change', this, newVal, oldVal);
>>>>>>> 38cd6bd449c3a417c9155d1ce5e54c0d54434138
  }
	
  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "notype")+"]"; }
}

<<<<<<< HEAD
=======
ZiAttribute.LOGS = { trace: () => {}, debug: () => {}, log: () => {}, warn: () => {}, error: () => {} };

>>>>>>> 38cd6bd449c3a417c9155d1ce5e54c0d54434138
module.exports = ZiAttribute;
