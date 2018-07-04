const EventEmitter = require('events').EventEmitter;
const Fs = require('fs');
const Path = require('path');
const MkDirP = require('mkdirp');

const ZiDriver = require('../driver/zidriver.js');
const ZiDevice = require('./zidevice.js');
const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');
const ZiCommand = require('./zicommand.js');

const LOAD_IN_PROGRESS = Symbol('load_in_progress');

const ZICOORDINATOR_LOGGERS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};

/* =========================== ZiDriver events ===================================
	'start', 'stop', 'error',
*/

class ZiLoadSave {
  constructor(coordinator, options) {
		options = options || { path: './zigate_data.json' };
		
		this.coordinator = coordinator || (() => { throw new Error("missing parameter 'coordinator'"); })();
		this.path = options.path;
		this.logger = options.logger || coordinator.logger;
		this[LOAD_IN_PROGRESS] = false;		

		this.coordinatorCallbacks = {
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
		Object.entries(this.coordinatorCallbacks).forEach( ([name, fn]) => this.coordinator.on(name, fn) );
  }
	
	shutdown() {
		Object.entries(this.coordinatorCallbacks).forEach( ([name, fn]) => this.coordinator.removeListener(name, fn) );
	}
	
	loadFile() {
		try {
      this.logger.trace("loadFile("+this.path+")...");
			this[LOAD_IN_PROGRESS] = true;			
			
			if (!Fs.existsSync(this.path)) {
				this.logger.log("initial zigate persistence file '"+this.path+"' doesn't exist ; creating a new one.");
        this.saveFile();
      }
			let devicesData = JSON.parse( Fs.readFileSync(this.path) );

			// devices
			devicesData.forEach(devdata => {
				let device = this.coordinator.getOrCreateDevice(d.address, d.ieee);
				
				// endpoints
				devdata.endpoints.forEach(endpointdata => {
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
			this.logger.log("successfully loaded persisted devices data from '"+this.path+"'.");

		} catch (e) {
			this.logger.warn("zigate data file load error:",e);
			this[LOAD_IN_PROGRESS] = false;		
			throw new Error("zigate data file load error: "+e);
			
		} finally {
			this[LOAD_IN_PROGRESS] = false;		
		}
	}
	
	saveFile() {
		try{
      this.logger.trace("saveFile("+this.path+")...");
			if (!Fs.existsSync(this.path)) {
				MkDirP.sync(Path.dirname(this.path));
			}			
			
			// devices
			let devicesData = Object.values(this.coordinator.devices).map(device => ({
				address: device.address,
				ieee: device.ieee,
				
				// endpoints
				endpoints: Object.values(device.endpoints).map(endpoint => ({
					id: endpoint.id,
					
					// clusters
					clusters: Object.values(endpoint.clusters).map(cluster => ({
						id: cluster.id,
						name: (cluster.type && cluster.type.name) || undefined,
						
						// attributes
						attributes: Object.values(cluster.attributes).map(attribute => ({
							id: attribute.id,
							name: (cluster.type && cluster.type.attributes && cluster.type.attributes[attribute.id] && cluster.type.attributes[attribute.id].name) || undefined,
						})),
						
						// commands
						commands: Object.values(cluster.commands).map(command => ({
							id: command.id,
							name: (cluster.type && cluster.type.commands && cluster.type.commands[command.id] && cluster.type.commands[command.id].name) || undefined,,
						})), // commands
						
					})), // clusters
					
				})), // endpoints
				
			})); // devices
			
			Fs.writeFileSync(this.path, JSON.stringify(devicesData, /*pretty print*/ null, 2 /*pretty print*/));
			this.logger.debug("zigate data file saved in '"+this.path+"'.");
		}
		catch (e) {
			this.logger.warn("zigate data file save error ("+this.path+"):",e);
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
