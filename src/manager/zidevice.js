const EventEmitter = require('events').EventEmitter;
const ZiEndpoint = require('./ziendpoint.js');
var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

let MANAGER = Symbol("MANAGER");

class ZiDevice extends EventEmitter {
    constructor(address, manager) {
      super();
      this.address = address;
			this[MANAGER] = manager;
      this.endpoints = {};
      this.clusters = {};
			this.ieee = null;
    }
		get manager() { return this[MANAGER]; }
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

    getOrCreateEndpoint(id) {
      if (!this.endpoints[id]) {
        this.endpoints[id] = new ZiEndpoint(id, this);
        ZiDevice.LOGS.log(""+this+""+this.endpoints[id]+": created");
      }
      return this.endpoints[id];
    }
    addEndpoints(endpointIds) {
      endpointIds.forEach((id) => {
        this.getOrCreateEndpoint(id);
      });
    }
}

ZiDevice.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ZiDevice;
