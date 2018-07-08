const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class Event extends EventEmitter {
  constructor(id, device, eventdef) {
    super();

    if (!id) throw new Error("no id provided");
    if (!device) throw new Error("no device provided");
    if (!eventdef) throw new Error("no definition provided");

    this[Sym.ID] = id;
    this[Sym.DEVICE] = device;
    this[Sym.EVENT_DEF] = eventdef;
    this[Sym.EVENT_CB] = [];
  }

	get id() { return this[Sym.ID]; }
	get definition() { return this[Sym.event_DEF]; }
  get device() { return this[Sym.DEVICE]; }
	fire() { return this[Sym.DEVICE][Sym.COORDINATOR].fireEvent(this, arguments); }

  [Sym.SETUP]() {
    let def = this[Sym.EVENT_DEF];
    this.log.debug('setup of event '+this+' with ('+JSON.stringify(def)+')...');

    // setup command binding
    if (def.attribute) {
      let attributeaddr = /^\W*((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W*$/gi.exec(def.attribute.id || ""+def.attribute)
      if (!attributeaddr) throw new Error("invalid attribue for event "+this.id+": attribute id = '"+(def.attribute.id || ""+def.attribute)+"'");

      let endpointId = parseInt(attributeaddr[1]);
      let clusterId = parseInt(attributeaddr[2]);
      let attributeId = parseInt(attributeaddr[3]);
      this[Sym.EVENT_CB].push(['attribute_change', (attr, newval, oldval) => {
        // skip un-relevant cases
        if (attr.id !== attributeId || attr.cluster.id !== clusterId || attr.endpoint.id !== endpointId) return;
        if (def.attribute.equal && newval !== def.attribute.equal) return;
        if (def.attribute.notequal && newval === def.attribute.notequal) return;
        if (def.attribute.was && oldval !== def.attribute.was) return;
        if (def.attribute.wasnot && oldval === def.attribute.wasnot) return;
        if (def.attribute.changeonly && newval === oldval) return;

        let args = [newval];
        if (typeof(def.attribute.args) === 'function') args = def.attribute.args.apply(this, [newval, oldval]);
        else if (typeof(def.attribute.args) !== undefined) args = def.attribute.args;
        this[Sym.DEVICE][Sym.COORDINATOR].fireEvent(this, args)
      }]);
    }
    this[Sym.EVENT_CB].forEach( cb => this.device.on(cb[0], cb[1]) );
  }

  [Sym.EVENT_FIRE](args) {
    this.log.info(''+this.device+''+this+' event fired.');
    this.emit(this.id, args);

  }

  [Sym.DESTROY]() {
    this[Sym.EVENT_CB].forEach( cb => this.device.removeListener(cb[0], cb[1]) );
  }

  get log() { return this.device.log; }
	toString() { return "[event_"+this.id+"]"; }

  inspect() { return ""+this+" ("+JSON.stringify(this.definition)+")"; }
}

module.exports = Event;
