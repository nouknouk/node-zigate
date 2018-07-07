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
    this[Sym.VALUE_DEF] = valuedef;
    this[Sym.VALUE_DATA] = undefined;
    this[Sym.VALUE_CB] = {};

    this.setup(valuedef);
  }

	get id() { return this[Sym.ID]; }
	get definition() { return this[Sym.VALUE_DEF]; }
  get type() { return this[Sym.TYPE]; }
	get value() { return this[Sym.VALUE_DATA]; }
  set value(val) { return this.setValue(val); }
	get device() { return this[Sym.DEVICE]; }

  setup(def) {
    if (def.type) this[Sym.TYPE] = def.type;

    // setup attribute binding
    if (def.attribute) {
      let attrdef = /^\W*((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W+((?:0x)?[0-9a-fA-F]+)\W*$/gi.exec(def.attribute.id)
      if (!attrdef) throw new Error("invalid attribue for value "+this.id+": attribute id = '"+def.attribute.id+"'");
      let endpointId = parseInt(attrdef[1]);
      let clusterId = parseInt(attrdef[2]);
      let attributeId = parseInt(attrdef[3]);

      this[Sym.VALUE_CB]['attribute_change'] = (attribute, newval, oldval) => {
        if (attribute.id === attributeId && attribute.cluster.id === clusterId && attribute.endpoint.id === endpointId) {
          let res = (def.attribute.toValue) ? def.attribute.toValue(newval) : newval;
          this[Sym.SET_VALUE_DATA](res);
        }
      };

      Object.entries(this[Sym.VALUE_CB]).forEach( ([key,fn]) => this.device.on(key, fn) );
      this.device.on()


    }
  }
  setValue(newval) {
    if (definition.attribute) {
      let attrval = definition.attribute.fromValue ? definition.attribute.fromValue(newval) : newval;
      return device.write(attrval).then( () => {
        this[Sym.SET_VALUE_DATA](newval);
      });
    }
  }
  [Sym.DESTROY]() {
    Object.entries(this[Sym.VALUE_CB]).forEach( ([key,fn]) => this.device.removeListener(key, fn) );
    this[Sym.VALUE_CB] = {};
    this[Sym.VALUE_DATA] = undefined;
  }

  [Sym.SET_VALUE_DATA](newval) {
    let oldval = this[Sym.VALUE_DATA];
    this[Sym.VALUE_DATA] = newval;
    this.emit('value_changed', this, newval, oldval);
    this.device.emit('value_changed', this, newval, oldval);
  }

  get log() { return this.device.log; }
	toString() { return "[value_"+this.id+"]"; }

  inspect() {
    return ""+this+"="+this[Sym.VALUE_DATA]+" ("+JSON.stringify(this.definition)+")";
  }
}

module.exports = Value;
