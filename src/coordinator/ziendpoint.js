const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
const ZiCluster = require('./zicluster.js');

var LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

class ZiEndpoint extends EventEmitter {
	constructor(id, device, verified) {
    this[Sym.ID] = id;
    this[Sym.DEVICE] = device;
		this[Sym.VERIFIED] = !!verified;
		this[Sym.CLUSTERS] = {};
	}

	get id() { return this[Sym.ID]; }
	get device() { return this[Sym.ENDPOINT][Sym.DEVICE]; }
	get verified() { return this[Sym.VERIFIED]; }
	set verified(v) { return this[Sym.VERIFIED] = v; }
	get clusters() { return Object.values(this[Sym.CLUSTERS]); }
	cluster(id) { return this[Sym.CLUSTERS][id]; }
	addCluster(id, verified) { return this.device[Sym.COORDINATOR].addCluster(this, id, verified); }
	queryClusters() { return this[Sym.COORDINATOR].queryClusters(this); }
	
  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return (""+this.type || "[cluster_0x"+this.id.toString(16)+","+((this.type && this.type.name) || 'notype')+"]"); }
}

module.exports = ZiEndpoint;
