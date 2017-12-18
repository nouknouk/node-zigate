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

    addClusters(clusterIds) {
      clusterIds.forEach((c_id) => {
        this.getOrCreateCluster(c_id);
      });
    }

    getOrCreateCluster(clusterId) {
      if (!this.clusters[clusterId]) {
        this.clusters[clusterId] = new ZiCluster(clusterId, this);
        ZiEndpoint.LOGS.log(""+this.device+""+this+""+this.clusters[clusterId]+": created.");
      }
      return this.clusters[clusterId];
    }
}

ZiEndpoint.LOGS = { 
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },	
};
module.exports = ZiEndpoint;
