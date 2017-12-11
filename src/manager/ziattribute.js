
class ZiAttribute {
  constructor(id, cluster) {
    this.id = id;
    this.cluster = cluster || null;
    this.attributeDef = null;
    if (this.cluster && this.cluster.clusterDef) {
      this.attributeDef = this.cluster.clusterDef.properties[id] || null;
    }
    this.value = (this.attributeDef && this.attributeDef.default) || null;
  }
  toString() { return "[attr_0x"+this.id.toString(16)+","+ ((this.attributeDef && this.attributeDef.name) || "unknown")+"]"; }

  setValue(newVal) {
    this.value = newVal;
    ZiAttribute.LOGS.log(""+this.cluster.endpoint.device+""+this.cluster.endpoint+""+this.cluster+""+this+": value changed("+this.value+")");
  }
}

ZiAttribute.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ZiAttribute;
