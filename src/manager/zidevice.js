const EventEmitter = require('events').EventEmitter;
const ZiEndpoint = require('./ziendpoint.js');
var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

class ZiDevice extends EventEmitter {
    constructor(address) {
      super();
      this.address = address;
      this.endpoints = {};
      this.clusters = {};
			this.ieee = null;
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
