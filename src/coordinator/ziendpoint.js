const EventEmitter = require('events').EventEmitter;
const ZiCluster = require('./zicluster.js');

var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

class ZiEndpoint extends EventEmitter {
    constructor(id, device) {
      super();
      this.id = id;
      this.device = device;
      this.clusters = {};
    }
    toString() {
      return "[endpoint_"+this.id+"]";
    }

    getCluster(clusterId) {
      return this.clusters[clusterId];
    }
    addCluster(clusterId) {
      if (!this.clusters[clusterId]) {
        this.clusters[clusterId] = new ZiCluster(clusterId, this);
        ZiEndpoint.LOGS.log(""+this.device+""+this+""+this.clusters[clusterId]+": created.");
				this.emit('cluster_add', this.clusters[clusterId]);
				this.device.emit('cluster_add', this.clusters[clusterId]);
				this.device.coordinator.emit('cluster_add', this.clusters[clusterId]);
      }
      return this.clusters[clusterId];
    }
    refreshAttribute(clusterId, attributeId) {
      return this.device.refreshAttribute(this.id, clusterId, attributeId);
    }
    writeAttribute(clusterid, attributeid, value) {
      return this.device.writeAttribute(this.id, clusterid, attributeid, value);
    }
}

ZiEndpoint.LOGS = { 
	trace: () => {},
	debug: () => {},
	log: () => {},
	warn: () => {},
	error: () => {},
};

module.exports = ZiEndpoint;
