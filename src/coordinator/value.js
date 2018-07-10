const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');

class Value extends EventEmitter {
  constructor(id, device, valuedef) {
    super();

    if (!id) throw new Error("no id provided");
    if (!device) throw new Error("no device provided");
    if (!valuedef) throw new Error("no definition provided");

    this[Sym.ID] = id;
    this[Sym.TYPE] = '';
    this[Sym.DEVICE] = device;
    this[Sym.DEFINITION] = valuedef;
    this[Sym.VALUE_DATA] = undefined;
    this[Sym.VALUE_CB] = {};
    this[Sym.VALUE_BOUND_ATTR] = null;
  }

	get id() { return this[Sym.ID]; }
	get definition() { return this[Sym.DEFINITION]; }
  get type() { return this[Sym.TYPE]; }
	get device() { return this[Sym.DEVICE]; }
  get log() { return this.device.log; }

  get value() { return this[Sym.VALUE_DATA]; }
  set value(val) { return this.setValue(val); }
  setValue(newval) { return this.device[Sym.COORDINATOR].setValue(this, newval, true); } // true = update bound attribute

  [Sym.SETUP]() {
    let def = this[Sym.DEFINITION];
    this.log.debug('setup of value '+this+' with ('+JSON.stringify(def)+')...');

    if (def.type) this[Sym.TYPE] = def.type;

    let initialValue = def.default;

    // setup attribute binding
    if (def.attribute) {
      let attrdef = /^\W*((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W*$/gi.exec(def.attribute.id)
      if (!attrdef) throw new Error("invalid attribue for value "+this.id+": attribute id = '"+def.attribute.id+"'");
      let endpointId = parseInt(attrdef[1]);
      let clusterId = parseInt(attrdef[2]);
      let attributeId = parseInt(attrdef[3]);

      // initial setup of bound attribute
      let attribute = this.device.attribute(endpointId, clusterId, attributeId);
      if (attribute) {
        // attribute already exists
        this[Sym.VALUE_BOUND_ATTR] = attribute;
        let res = (def.attribute.toValue) ? def.attribute.toValue(attribute.value, this) : attribute.value;
        initialValue = res;
      }
      else {
        // attribute doesn't exist yet ; wait for its addition
        this[Sym.VALUE_CB]['attribute_add'] = (attribute) => {
          if (this[Sym.VALUE_BOUND_ATTR]) return; // already bound ; skip.
          else if (attribute.id === attributeId && attribute.cluster.id === clusterId && attribute.endpoint.id === endpointId) {
            this[Sym.VALUE_BOUND_ATTR] = attribute;
            this[Sym.VALUE_CB]['attribute_change'](attribute, attribute.value);
          }
        };
      }

      // monitor attributes changes and reflect to this value.
      this[Sym.VALUE_CB]['attribute_change'] = (attribute, newval, oldval) => {
        if (attribute === this[Sym.VALUE_BOUND_ATTR]) {
          let res = (def.attribute.toValue) ? def.attribute.toValue(newval, this) : newval;
          this.device[Sym.COORDINATOR].setValue(this, res, false) // false = don't update bound attribute
        }
      };
    }

    // bind all callbacks.
    Object.entries(this[Sym.VALUE_CB]).forEach( ([key,fn]) => { this.device.on(key, fn) });

    this[Sym.VALUE_DATA] = initialValue;
  }

  [Sym.DESTROY]() {
    Object.entries(this[Sym.VALUE_CB]).forEach( ([key,fn]) => {
      //this.log.debug(''+this+' stops listening for events "'+key+'" of '+this.device);
      this.device.removeListener(key, fn)
    });
    this[Sym.VALUE_CB] = {};
    this[Sym.VALUE_DATA] = undefined;
    this[Sym.VALUE_BOUND_ATTR] = null;
  }

  [Sym.SET_VALUE_DATA](newval) {
    let oldval = this[Sym.VALUE_DATA];
    this[Sym.VALUE_DATA] = newval;
    this.log.debug(''+this.device+''+this+' value changed ('+JSON.stringify(oldval)+') => ('+JSON.stringify(newval)+')');
    this.emit('value_change', this, newval, oldval);
  }

	toString() { return "[value_"+this.id+"]"; }
  inspect() { return ""+this+"="+this[Sym.VALUE_DATA]+" ("+JSON.stringify(this.definition)+")"; }
}

module.exports = Value;
