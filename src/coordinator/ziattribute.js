const CLUSTER = Symbol("CLUSTER");

class ZiAttribute {
  constructor(id, cluster) {
    this.id = id;
    this[CLUSTER] = cluster || null;
    this.type = null;
    if (this.cluster && this.cluster.type) {
      this.type = this.cluster.type.attributes[id] || null;
    }
		this.value = (this.type && typeof(this.type.default) !== "undefined") ? this.type.default : null;
  }
  toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.type && this.type.name) || "unknown")+"]"; }

	get cluster() { return this[CLUSTER]; }

  refresh() {
    return this[CLUSTER].refreshAttribute(this.id);
  }
  write(value) {
    return this[CLUSTER].writeAttribute(this.id, value);
  }
  setValue(newVal) {
    this.value = newVal;
    ZiAttribute.LOGS.debug(""+this.cluster.endpoint.device+""+this.cluster.endpoint+""+this.cluster+""+this+": value changed("+this.value+")");
  }
}

ZiAttribute.LOGS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};
module.exports = ZiAttribute;
