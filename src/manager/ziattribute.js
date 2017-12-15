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
	
  setValue(newVal) {
    this.value = newVal;
    ZiAttribute.LOGS.log(""+this.cluster.endpoint.device+""+this.cluster.endpoint+""+this.cluster+""+this+": value changed("+this.value+")");
  }
}

ZiAttribute.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ZiAttribute;
