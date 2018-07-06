const EventEmitter = require('events').EventEmitter;
const Fs = require('fs');
const Path = require('path');
const MkDirP = require('mkdirp');

const Sym = require('./symbols.js');

const Driver = require('../driver/driver.js');
const Device = require('./device.js');
const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');
const ZiCommand = require('./zicommand.js');

const LOAD_IN_PROGRESS = Symbol('load_in_progress');

class ZiLoadSave {
  constructor(coordinator, options) {
		options = options || { path: './zigate_data.json' };
		
		this[Sym.COORDINATOR] = coordinator || (() => { throw new Error("missing parameter 'coordinator'"); })();
		this.path = options.path;
		this[Sym.LOG]ger = options.logger || coordinator.logger;
		this[LOAD_IN_PROGRESS] = false;		

		this[Sym.COORDINATOR]Callbacks = {
			error: (err) => { },
			started: () => { this.onStart(); },
			stopped: () => { },
			reset: () => { },
			
			device_add: (device) => { this.onDeviceAdded(device); },
			device_remove: (device) => { this.onDeviceRemoved(device); },
			endpoint_add: (endpoint) => { this.onEndpointAdded(endpoint); } ,
			cluster_add: (cluster) => { this.onClusterAdded(cluster); },
			attribute_add: (attribute) => { this.onAttributeAdded(attribute); },
		};
		Object.entries(this[Sym.COORDINATOR]Callbacks).forEach( ([name, fn]) => this[Sym.COORDINATOR].on(name, fn) );
  }
	
	shutdown() {
		Object.entries(this[Sym.COORDINATOR]Callbacks).forEach( ([name, fn]) => this[Sym.COORDINATOR].removeListener(name, fn) );
	}
	
	loadFile() {
		try {
      this[Sym.LOG]ger.trace("loadFile("+this.path+")...");
			this[LOAD_IN_PROGRESS] = true;			
			
			if (!Fs.existsSync(this.path)) {
				this[Sym.LOG]ger.log("initial zigate persistence file '"+this.path+"' doesn't exist ; creating a new one.");
        this.saveFile();
      }
			let devicesData = JSON.parse( Fs.readFileSync(this.path) );

			// devices
			devicesData.forEach(devicedata => {
				let device = this[Sym.COORDINATOR].getOrCreateDevice(devicedata.address, devicedata.ieee);
				
				// endpoints
				devicedata.endpoints.forEach(endpointdata => {
					let endpoint = device.addEndpoint(endpointdata.id);

					// clusters
					endpointdata.clusters.forEach(clusterdata => {
						let cluster = endpoint.addCluster(clusterdata.id);

						// attributes
						clusterdata.attributes.forEach(attributedata => cluster.addAttribute(attributedata.id));

						// commands						
						clusterdata.commands.forEach(commanddata => cluster.addCommand(command.id));
					});
				});
				
			});
			this[Sym.LOG]ger.log("successfully loaded persisted devices data from '"+this.path+"'.");

		} catch (e) {
			this[Sym.LOG]ger.warn("zigate data file load error:",e);
			this[LOAD_IN_PROGRESS] = false;		
			throw new Error("zigate data file load error: "+e);
			
		} finally {
			this[LOAD_IN_PROGRESS] = false;		
		}
	}
	
	saveFile() {
		try{
      this[Sym.LOG]ger.trace("saveFile("+this.path+")...");
			if (!Fs.existsSync(this.path)) {
				MkDirP.sync(Path.dirname(this.path));
			}			
			
			// devices
			let devicesData = Object.values(this[Sym.COORDINATOR].devices).map(device => ({
				address: device.address,
        hex: "0x"+(("0000"+Number(device.address).toString(16)).substr(-4,4)),
				ieee: device.ieee,
				
				// endpoints
				endpoints: Object.values(device.endpoints).map(endpoint => ({
					id: endpoint.id,
          hex: "0x"+(("0000"+Number(endpoint.id).toString(16)).substr(-4,4)),
					
					// clusters
					clusters: Object.values(endpoint.clusters).map(cluster => ({
						id: cluster.id,
            hex: "0x"+(("0000"+Number(cluster.id).toString(16)).substr(-4,4)),
						name: (cluster.type && cluster.type.name) || undefined,
						
						// attributes
						attributes: Object.values(cluster.attributes).map(attribute => ({
							id: attribute.id,
              hex: "0x"+(("0000"+Number(attribute.id).toString(16)).substr(-4,4)),
							name: (cluster.type && cluster.type.attributes && cluster.type.attributes[attribute.id] && cluster.type.attributes[attribute.id].name) || undefined,
						})),
						
						// commands
						commands: Object.values(cluster.commands).map(command => ({
							id: command.id,
              hex: "0x"+(("0000"+Number(command.id).toString(16)).substr(-4,4)),
							name: (cluster.type && cluster.type.commands && cluster.type.commands[command.id] && cluster.type.commands[command.id].name) || undefined,
						})), // commands
						
					})), // clusters
					
				})), // endpoints
				
			})); // devices
			
			Fs.writeFileSync(this.path, JSON.stringify(devicesData, /*pretty print*/ null, 2 /*pretty print*/));
			this[Sym.LOG]ger.debug("zigate data file saved in '"+this.path+"'.");
		}
		catch (e) {
			this[Sym.LOG]ger.warn("zigate data file save error ("+this.path+"):",e);
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
		this.saveFile();
	}
	onDeviceRemoved(device) {
		if (this[LOAD_IN_PROGRESS]) return; // skip
		this.saveFile();
	}
	onEndpointAdded(endpoint) {
		if (this[LOAD_IN_PROGRESS]) return; // skip
		this.saveFile();
	}
	onClusterAdded(cluster) {
		if (this[LOAD_IN_PROGRESS]) return; // skip
		this.saveFile();
	}
	onAttributeAdded(attribute) {
		if (this[LOAD_IN_PROGRESS]) return; // skip
		this.saveFile();
	}
	
}

module.exports = ZiLoadSave;
