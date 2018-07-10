const EventEmitter = require('events').EventEmitter;
const Fs = require('fs');
const Path = require('path');
const MkDirP = require('mkdirp');

const Sym = require('./symbols.js');

const Driver = require('../driver/driver.js');
const Device = require('./device.js');
const DeviceTypes = require('./deviceTypes.js');

const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');
const ZiCommand = require('./zicommand.js');

const LOAD_IN_PROGRESS = Symbol('LOAD_IN_PROGRESS');
const FILE_DATA = Symbol('FILE_DATA');
const COORDINATOR_CALLBACKS = Symbol('COORDINATOR_CALLBACKS');

const LOAD_SAVE_LOGGERS = {
	nolog:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: ()=>{},       },
	console: { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: console.error },
};

class DeviceLoadSave {
  constructor(coordinator, options) {
		options = options || {
			log: null,            // 'nolog',
			loadsavepath: null,   // './zigate_data.json'
		};

		this[Sym.COORDINATOR] = coordinator || (() => { throw new Error("missing parameter 'coordinator'"); })();
		this.path = options.path ||options.loadsavepath;
		this[Sym.LOG] = (typeof(options.log) === 'object' && options.log)
										|| LOAD_SAVE_LOGGERS[options.log]
										|| (coordinator.log.getLogger && coordinator.log.getLogger('loadsave'))
										|| coordinator.log
										|| LOAD_SAVE_LOGGERS['nolog'];
		this[LOAD_IN_PROGRESS] = false;
		this[FILE_DATA] = {};
		this[COORDINATOR_CALLBACKS] = {
			error: (err) => { },
			started: () => { this.onStart(); },
			stopped: () => { },
			reset: () => { },

			device_add: (device) => { this.onDeviceAdded(device); },
			device_remove: (device) => { this.onDeviceRemoved(device); },
			endpoint_add: (endpoint) => { this.onEndpointAdded(endpoint); } ,
			cluster_add: (cluster) => { this.onClusterAdded(cluster); },
			attribute_add: (attribute) => { this.onAttributeAdded(attribute); },
			attribute_change: (attribute, value, oldval) => { this.onAttributeChanged(attribute, value, oldval); },
		};
		Object.entries(this[COORDINATOR_CALLBACKS]).forEach( ([name, fn]) => this[Sym.COORDINATOR].on(name, fn) );
  }

	static get LOGGERS() { return LOAD_SAVE_LOGGERS; };

	shutdown() {
		Object.entries(this[COORDINATOR_CALLBACKS]).forEach( ([name, fn]) => this[Sym.COORDINATOR].removeListener(name, fn) );
	}

	loadFile() {
		try {
      this.log.trace("loadFile("+this.path+")...");
			this[LOAD_IN_PROGRESS] = true;
			if (!Fs.existsSync(this.path)) {
				this.log.info("initial zigate persistence file '"+this.path+"' doesn't exist ; creating a new one.");
        this.saveFile();
      }
			this[FILE_DATA] = JSON.parse( Fs.readFileSync(this.path) );

			// devices
			this[FILE_DATA].forEach(devicedata => {
				let device = this[Sym.COORDINATOR].addDevice(devicedata.address, devicedata.ieee);
				// endpoints
				devicedata.endpoints.filter(o => o.verified).forEach(endpointdata => {
					let endpoint = device.addEndpoint(endpointdata.id, endpointdata.verified);

					// clusters
					endpointdata.clusters.filter(o => o.verified).forEach(clusterdata => {
						let cluster = endpoint.addCluster(clusterdata.id, clusterdata.verified);

						// attributes
						clusterdata.attributes.filter(o => o.verified).forEach(attributedata => {
							cluster.addAttribute(attributedata.id, attributedata.value, attributedata.verified);
						});

						// commands
						clusterdata.commands.filter(o => o.verified).forEach(commanddata => {
							cluster.addCommand(command.id, command.verified);
						});
					}); // endOf-clusters
				}); // endOf-endpoints

				let deviceTypes = this[Sym.COORDINATOR].deviceTypes;
				let type = deviceTypes.type(devicedata.type) || deviceTypes.getBestDeviceType(device);
				this[Sym.COORDINATOR].setDeviceType(device, type);
			}); // endOf-devices

			this.log.info("successfully loaded persisted devices data from '"+this.path+"'.");

		} catch (e) {
			this.log.warn("zigate data file load error:",e);
			this[LOAD_IN_PROGRESS] = false;
			throw new Error("zigate data file load error: "+e);

		} finally {
			this[LOAD_IN_PROGRESS] = false;
		}
	}

	saveFile() {
		try{
      this.log.trace("saveFile("+this.path+")...");
			if (!Fs.existsSync(this.path)) {
				MkDirP.sync(Path.dirname(this.path));
			}

			let deviceTypes = this[Sym.COORDINATOR].deviceTypes;

			// devices
			this[FILE_DATA] = this[Sym.COORDINATOR].devices.map(device => ({
				address: device.address,
        hex: "0x"+(("0000"+Number(device.address).toString(16)).substr(-4,4)),
				ieee: device.ieee,
				type: device.type,

				// endpoints
				endpoints: device.endpoints.map(endpoint => ({
					id: endpoint.id,
          hex: "0x"+(("0000"+Number(endpoint.id).toString(16)).substr(-4,4)),
					verified: endpoint.verified,
					// clusters
					clusters: endpoint.clusters.map(cluster => ({
						id: cluster.id,
            hex: "0x"+(("0000"+Number(cluster.id).toString(16)).substr(-4,4)),
						name: (cluster.type && cluster.type.name) || undefined,
						verified: cluster.verified,
						// attributes
						attributes: cluster.attributes.map(attribute => ({
							id: attribute.id,
              hex: "0x"+(("0000"+Number(attribute.id).toString(16)).substr(-4,4)),
							name: (attribute.type && cluster.type.name),
							value: deviceTypes.isAttributeForDeviceIdentification(cluster.id, attribute.id) ? attribute.value : undefined,
							verified: attribute.verified,
						})),
						// commands
						commands: cluster.commands.map(command => ({
							id: command.id,
              hex: "0x"+(("0000"+Number(command.id).toString(16)).substr(-4,4)),
							name: (command.type && command.type.name),
							verified: command.verified,
						})), // commands

					})), // clusters

				})), // endpoints

			})); // devices

			Fs.writeFileSync(this.path, JSON.stringify(this[FILE_DATA], /*pretty print*/ null, 2 /*pretty print*/));
			this.log.info("zigate data file saved in '"+this.path+"'.");
		}
		catch (e) {
			this.log.warn("zigate data file save error ("+this.path+"):",e);
			throw e;
		}
	}

	onStart() {
		this.loadFile();
	}
	onStop() {
		this.saveFile();
	}

	onDeviceAdded(device) {
		if (this[LOAD_IN_PROGRESS]) return; // skip

		let devicedata = this[FILE_DATA].find(d => d.address === device.address);
		if (devicedata) return; // device already present ; skip.

		this.saveFile();
	}
	onDeviceRemoved(device) {
		if (this[LOAD_IN_PROGRESS]) return; // skip

		let devicedata = this[FILE_DATA].find(d => d.address === device.address);
		if (!devicedata) return; // device already removed ; skip.

		this.saveFile();
	}
	onEndpointAdded(endpoint) {
		if (this[LOAD_IN_PROGRESS]) return; // skip

		let devicedata = this[FILE_DATA].find(d => d.address === endpoint.device.address);
		let endpointdata = devicedata && devicedata.endpoints.find(e => e.id === endpoint.id);
		if (endpointdata) return; // endpoint already present ; skip.

		this.saveFile();
	}
	onClusterAdded(cluster) {
		if (this[LOAD_IN_PROGRESS]) return; // skip

		let devicedata = this[FILE_DATA].find(d => d.address === cluster.device.address);
		let endpointdata = devicedata && devicedata.endpoints.find(e => e.id === cluster.endpoint.id);
		let clusterdata = endpointdata && endpointdata.clusters.find(c => c.id === cluster.id);
		if (clusterdata) return; // cluster already present ; skip.

		this.saveFile();
	}
	onAttributeAdded(attribute) {
		if (this[LOAD_IN_PROGRESS]) return; // skip

		let devicedata = this[FILE_DATA].find(d => d.address === attribute.device.address);
		let endpointdata = devicedata && devicedata.endpoints.find(e => e.id === attribute.endpoint.id);
		let clusterdata = endpointdata && endpointdata.clusters.find(c => c.id === attribute.cluster.id);
		let attributedata = clusterdata && clusterdata.attributes.find(a => a.id === attribute.id);
		if (attributedata) return; // attributedata already present ; skip.

		this.saveFile();
	}

	onAttributeChanged(attribute, value, oldval) {
		if (this[LOAD_IN_PROGRESS]) return; // skip
		if (! (this[Sym.COORDINATOR].deviceTypes.isAttributeForDeviceIdentification(attribute.cluster.id, attribute.id))) return;

		let devicedata = this[FILE_DATA].find(d => d.address === attribute.device.address);
		let endpointdata = devicedata && devicedata.endpoints.find(e => e.id === attribute.endpoint.id);
		let clusterdata = endpointdata && endpointdata.clusters.find(c => c.id === attribute.cluster.id);
		let attributedata = clusterdata && clusterdata.attributes.find(a => a.id === attribute.id);
		if (attributedata.value === value) return;

		this.saveFile();
	}

  get log() { return this[Sym.LOG]; }
	toString() { return "[DeviceLoadSave]"; }
}

module.exports = DeviceLoadSave;
