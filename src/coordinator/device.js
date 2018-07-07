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
    }
		get address() { return this[Sym.ADDRESS]; }
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

		[Sym.DESTROY]() {
			this.emit('device_remove', this);
		}

		get log() { return this[Sym.COORDINATOR].log; }
    toString() { return "[device_0x"+this[Sym.ADDRESS].toString(16)+"]"; }
}


module.exports = Device;
