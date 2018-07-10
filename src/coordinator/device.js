const EventEmitter = require('events').EventEmitter;
const Sym = require('./symbols.js');
const ZiEndpoint = require('./ziendpoint.js');
const DeviceTypes = require('./deviceTypes.js');

class Device extends EventEmitter {
    constructor(coordinator, address) {
      super();
      this[Sym.ADDRESS] = address;
			this[Sym.TYPE] = DeviceTypes.Default;
      this[Sym.COORDINATOR] = coordinator;
			this[Sym.IEEE] = null;
			this[Sym.READY] = false;
      this[Sym.ENDPOINTS] = {};
      this[Sym.VALUES] = {};
      this[Sym.ACTIONS] = {};
      this[Sym.EVENTS] = {};
    }
		get address() { return this[Sym.ADDRESS]; }
    get hex() { return "0x"+(("0000"+Number(this.address).toString(16)).substr(-4,4)); }
		get ieee() { return this[Sym.IEEE]; }
		set ieee(ieee) { if (this[Sym.IEEE] !== null) throw new Error(""+this+" ieee already set."); else this[Sym.IEEE] = ieee; }
		get type() { return this[Sym.TYPE].id; }

		get endpoints() { return Object.values(this[Sym.ENDPOINTS]); }
		endpoint(id) { return this[Sym.ENDPOINTS][id]; }
		addEndpoint(id, verified) { return this[Sym.COORDINATOR].addEndpoint(this, id, verified); }
		queryEndpoints() { return this[Sym.COORDINATOR].queryEndpoints(this); }

		get attributes() {
			var attrs = [];
			Object.keys(this[Sym.ENDPOINTS]).forEach( (eid)=> {
				var endpoint = this[Sym.ENDPOINTS][eid];
				Object.keys(this[Sym.ENDPOINTS][eid].clusters).forEach( (cid)=> {
					var cluster = endpoint.clusters[cid];
					Object.keys(cluster.attributes).forEach( (aid)=> {
						var attr = cluster.attributes[aid];
						attrs.push(attr);
					});
				});
			});
			return attrs;
		}

		attribute(endpoint, cluster, attribute) {
			let edp = this.endpoint(endpoint);
			if (edp) {
				let clu = edp.cluster(cluster);
				if (clu) {
					return clu.attribute(attribute);
				}
			}
			return null;
		}

    get values() { return Object.values(this[Sym.VALUES]); }
    value(id) { return this[Sym.VALUES][id]; }
    addValue(id, definition) { this[Sym.COORDINATOR].addValue(this, id, definition); }
    removeValue(id) { this[Sym.COORDINATOR].removeValue(this, id); }

    get actions() { return Object.values(this[Sym.ACTIONS]); }
    action(id) { return this[Sym.ACTIONS][id]; }
    addAction(id, definition) { this[Sym.COORDINATOR].addAction(this, id, definition); }
    removeAction(id) { this[Sym.COORDINATOR].removeAction(this, id); }

    get events() { return Object.values(this[Sym.EVENTS]); }
    event(id) { return this[Sym.EVENTS][id]; }
    addEvent(id, definition) { this[Sym.COORDINATOR].addEvent(this, id, definition); }
    removeEvent(id) { this[Sym.COORDINATOR].removeEvent(this, id); }


		[Sym.ON_ENDPOINT_ADD](endpoint) {
			this.emit('endpoint_add', endpoint);
		}
		[Sym.ON_CLUSTER_ADD](cluster) {
			this.emit('cluster_add', cluster);
		}
		[Sym.ON_ATTRIBUTE_ADD](attribute) {
			this.emit('attribute_add', attribute);
		}
		[Sym.ON_ATTRIBUTE_CHANGE](attribute, newval, oldval) {
			this.emit('attribute_change', attribute, newval, oldval);
		}
		[Sym.ON_COMMAND_ADD](command) {
			this.emit('command_add', command);
		}
    [Sym.ON_VALUE_ADD](value) {
      this.emit('value_add', value);
		}
    [Sym.ON_VALUE_REMOVE](value) {
      this.emit('value_remove', value);
		}
    [Sym.ON_VALUE_CHANGE](value, newval, oldval) {
      this.emit('value_change', value, newval, oldval);
		}
    [Sym.ON_ACTION_ADD](action) {
      this.emit('action_add', action);
		}
    [Sym.ON_ACTION_REMOVE](action) {
      this.emit('action_remove', action);
		}
    [Sym.ON_ACTION_EXEC](action, args, ret) {
      this.emit('action_exec', action, args, ret);
    }
    [Sym.ON_EVENT_ADD](event) {
      this.emit('event_add', event);
		}
    [Sym.ON_EVENT_REMOVE](action) {
      this.emit('event_remove', action);
		}
    [Sym.ON_EVENT_FIRE](event, args) {
      this.emit(event.id, args);
    }
    [Sym.ON_TYPE_CHANGE](newtypename, oldtypename) {
      this.emit('type_change', newtypename, oldtypename);
    }
		[Sym.DESTROY]() {
			this.emit('device_remove', this);
		}

		get log() { return this[Sym.COORDINATOR].log; }
    toString() { return "[device_0x"+this[Sym.ADDRESS].toString(16)+"]"; }
    inspect() {
      let out = ''+this+' ('+this.type+')\n';
      this.endpoints.forEach(e => {
        out += '    '+e+'\n';
        e.clusters.forEach((c) => {
          out += '        '+c+'\n';
          c.attributes.forEach((a) => { out += '            '+a.inspect()+'\n'});
          c.commands.forEach((c) => { out += '            '+c+'\n'});
        });
      });
      this.values.forEach((v) => { out += '    '+v.inspect()+'\n'});
      this.actions.forEach((a) => { out += '    '+a.inspect()+'\n'});
      this.events.forEach((e) => { out += '    '+e.inspect()+'\n'});

      return out;
    }
}


module.exports = Device;
