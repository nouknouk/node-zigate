const EventEmitter = require('events').EventEmitter;
const ZiEndpoint = require('./ziendpoint.js');
var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

class ZiDevice extends EventEmitter {
    constructor(id) {
      super();
      this.id = id;
      this.endpoints = {};
      this.clusters = {};
			this.ieeeAddress = null;
			this.mac = null;
			this.alternatePanCoordinator = null;
			this.deviceType = null;
			this.powerSource = null;
			this.receiverOnWhenIdle = null;
			this.reserved = null;
			this.securityCapability = null;
			this.allocateAddress = null;
			this.rssi = null;
    }
    toString() {
      return "[device_0x"+this.id.toString(16)+"]";
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
