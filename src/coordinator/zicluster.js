const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
let Enum = require('../driver/enum.js');
let ZiAttribute = require('./ziattribute.js');
let ZiCommand = require('./zicommand.js');

class ZiCluster extends EventEmitter {
	constructor(id, endpoint, verified) {
		super();
    this[Sym.ID] = id;
    this[Sym.ENDPOINT] = endpoint;
    this[Sym.TYPE] = Enum.CLUSTERS(id);
		this[Sym.VERIFIED] = !!verified;
		this[Sym.ATTRIBUTES] = {};
		this[Sym.COMMANDS] = {};
	}

	get id() { return this[Sym.ID]; }
	get type() { return this[Sym.TYPE]; }
	get verified() { return this[Sym.VERIFIED]; }
	set verified(v) { return this[Sym.VERIFIED] = v; }
	get endpoint() { return this[Sym.ENDPOINT]; }
	get device() { return this[Sym.ENDPOINT][Sym.DEVICE]; }

	get attributes() { return Object.values(this[Sym.ATTRIBUTES]); }
	attribute(id) { return this[Sym.ATTRIBUTES][id]; }
	addAttribute(id, value, verified) { return this.device[Sym.COORDINATOR].addAttribute(this, id, value, verified); }
	queryAttributes() { return this[Sym.COORDINATOR].queryAttributes(this); }
	
	get commands() { return Object.values(this[Sym.COMMANDS]); }
	command(id) { return this[Sym.COMMANDS][id]; }
	addCommand(id, verified) { return this.device[Sym.COORDINATOR].addCommand(this, id); }

  get log() { return this.device[Sym.COORDINATOR].log; }
	toString() { return (""+this.type || "[cluster_0x"+this.id.toString(16)+","+((this.type && this.type.name) || 'notype')+"]"); }
}

module.exports = ZiCluster;
