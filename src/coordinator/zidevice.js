const EventEmitter = require('events').EventEmitter;
const ZiEndpoint = require('./ziendpoint.js');
var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

class ZiDevice extends EventEmitter {
    constructor(address, coordinator) {
      super();
      this.address = address;
      this.coordinator = coordinator;
      this.endpoints = {};
			this.ieee = null;
    }
		get attributes() {
			var attrs = [];
			Object.keys(this.endpoints).forEach( (eid)=> {
				var endpoint = this.endpoints[eid];
				Object.keys(this.endpoints[eid].clusters).forEach( (cid)=> {
					var cluster = endpoint.clusters[cid];
					Object.keys(cluster.attributes).forEach( (aid)=> {
						var attr = cluster.attributes[aid];
						attrs.push(attr);
					});
				});
			});
			return attrs;
		}
    toString() {
      return "[device_0x"+this.address.toString(16)+"]";
    }

    getEndpoint(id) {
      return this.endpoints[id];
    }
    addEndpoint(id) {
      if (!this.endpoints[id]) {
        this.endpoints[id] = new ZiEndpoint(id, this);
        ZiDevice.LOGS.log(""+this+""+this.endpoints[id]+": created");
      }
      return this.endpoints[id];
    }
    refreshAttribute(endpointid, clusterid, attributeid) {
      return this.coordinator.driver.send({type: 'attribute_read', address: this.address, endpoint:endpointid, cluster:clusterid, attributes:[attributeid]});
    }
    writeAttribute(endpointid, clusterid, attributeid, value) {
      return this.coordinator.driver.send({type: 'attribute_write', address: this.address, endpoint:endpointid, cluster:clusterid, attribute:attributeid, value:value});
    }

}

ZiDevice.LOGS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};

module.exports = ZiDevice;
