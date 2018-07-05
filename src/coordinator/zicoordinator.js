const EventEmitter = require('events').EventEmitter;
const ZiDriver = require('../driver/zidriver.js');
const ZiDevice = require('./zidevice.js');
const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');
const ZiCommand = require('./zicommand.js');
const ZiLoadSave = require('./ziloadsave.js');

const EquipmentManager = require('./equipmentManager.js');
const Equipment = require('./equipment.js');

const ZICOORDINATOR_LOGGERS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};

/* =========================== ZiDriver events ===================================
	'start', 'stop', 'error',
*/

class ZiCoordinator extends EventEmitter {
  constructor(options) {
		options = options || {};
    super();

    this.logger = typeof(options.logger) === 'object' ? options.logger : ZICOORDINATOR_LOGGERS[options.logger  || 'nolog'];
		ZiDevice.LOGS = ZiEndpoint.LOGS = ZiCluster.LOGS = ZiAttribute.LOGS = ZiCommand.LOGS = this.logger;
		EquipmentManager.LOGS = Equipment.LOGS = this.logger;

    this.driver = new ZiDriver(options);
    this.driver.on('open', this.onDriverOpen.bind(this));
    this.driver.on('close', this.onDriverClose.bind(this));
    this.driver.on('error', this.onDriverError.bind(this));
    this.driver.on('command', this.onDriverCommand.bind(this));
    this.driver.on('response', this.onDriverResponse.bind(this));

    this.mgrStatus = 'stopped';
		this.inclusionStatus = false;
    this.devices = {};
		this.loadsave = options.file ? new ZiLoadSave(this, {path: options.file}) : null;
    this.equipmentManager = new EquipmentManager(this);
    this.equipmentManager.loadProfiles();

  }
  static get LOGGERS() { return ZICOORDINATOR_LOGGERS; };

  get started() { return this.driver.isOpen }
  get status() { return this.mgrStatus; }

  start(port, options) {

    // called with only 1 arg, 'options'
    options = (port && typeof(port) === 'object') ? port : (options || {});
    // called with 2 args, store 'port' into options.port
    options.port = (port && typeof(port) === 'string') ? port : options.port;

    // if no port provided at all, it will guess automatically the right one and open it.

    if (!this.started) {
      this.mgrStatus = 'starting';
      return this.driver.open(options.port)
			.then(() => { this.driver.send('channel_mask', {mask: 11}); })
			.then(() => { this.driver.send('device_type', {type: 'coordinator'}); })
      .then(()=> {
        this.mgrStatus = 'started';
        this.logger.log("[ZiCoordinator] zigbee network is up ; starting devices discovery...");
				this.driver.send('devices_list');
      },
      (err)=> {
        this.mgrStatus = 'stopped';
        this.logger.log("[ZiCoordinator] start failed: ", err)
        this.emit('error', err);
				return Promise.reject(err);
      })
    }
    else {
      var err = new Error("coordinator is already started")
      this.logger.log("[ZiCoordinator] start failed: ", err)
      this.emit('error', err);
      return Promise.reject(err);
    }
  }
  stop() {
    if (this.started) {
      this.mgrStatus = 'stopping';
      return this.driver.close().then(
        ()=> {
          this.mgrStatus = 'stopped';
					this.inclusionStatus = false;
          this.logger.log("[ZiCoordinator] stopped.");
          this.emit('stop');
        },
        (err) => {
          err = new Error("coordinator is already stopped")
          this.logger.log("[ZiCoordinator] stop failed: ", err)
          this.emit('error', err);
          return Promise.reject(err);
        }
      );
    }
    else {
      return Promise.resolve();
    }
  }
  reset() {
    if (this.started) {
      return this.driver.send('reset').then(
        ()=> {
          this.logger.log("[ZiCoordinator] reset done.");
          this.emit('reset');
        },
        (err) => {
          err = new Error("reset error: "+err)
          this.emit('error', err);
					throw err;
        }
      );
    }
    else {
      var err = new Error("coordinator is not started yet");
      this.logger.log("[ZiCoordinator] reset failed: ", err)
      return Promise.reject(err);
    }
  }
	startInclusion(timeInSec) {
		if (this.started) {
			return this.driver.send('permit_join', {duration: timeInSec}).then(
        (command)=> {
          this.logger.log("[ZiCoordinator] inclusion mode started for "+command.options.duration+" seconds.");
					this.inclusionStatus = true;
          this.emit('inclusion_start');
					setTimeout(()=> {
						if (this.inclusionStatus) {
							this.inclusionStatus = false;
							this.emit('inclusion_stop');
						}
					}, timeInSec*1000);
        },
        (err) => {
          err = new Error("[ZiCoordinator] start inclusion error: "+err)
          this.emit('error', err);
          return Promise.reject(err);
        }
			);
		}
		else {
      var err = new Error("coordinator is not started yet");
      this.logger.log("[ZiCoordinator] reset failed: ", err)
      this.emit('error', err);
      return Promise.reject(err);
    }
	}
	endpointsOf(deviceId) {
		this.driver.send('active_endpoint', { address: deviceId });
		this.driver.once('response_active_endpoint', (rep) => {
			this.logger.warn("--------- endpoints -----------");
			this.logger.warn("device ("+deviceId+"): "+rep.endpoints.length+" available endpoints: "+JSON.stringify(rep.endpoints));
			this.logger.warn("-------------------------------");
		});
	}
	clustersOf(deviceId, endpointId) {
		this.driver.send('descriptor_simple', {address: deviceId, endpoint:endpointId});
		this.driver.once('response_descriptor_simple', (rep) => {
			this.logger.warn("---------- descriptor_simple ----------");
			this.logger.warn("device ("+rep.address+"), endpoint ("+rep.endpoint+"): in="+JSON.stringify(rep.inClusters)+" ; out="+JSON.stringify(rep.outClusters));
			this.logger.warn("------------------------------");
		});
	}
	attributesOf(deviceId, endpointId, clusterId, count) {
		this.driver.send('attribute_discovery', { address:deviceId, endpoint:endpointId, cluster:clusterId, count:count || 5});
		this.driver.once('response_attribute_discovery_response', (rep) => {
			this.logger.warn("------- attribute_discovery ---------");
			this.logger.warn("attribute="+rep.attributeId+" ("+rep.attributeTypeName+")");
			this.logger.warn("-------------------------------------");
		});
	}

  onDriverOpen() {
    this.devices = {};
    this.emit('started');
  }

  onDriverClose() {
    this.emit('stopped');
    this.devices = {};
  }

  onDriverError(err) {
    this.emit('error', err);
  }

  onDriverCommand(cmd) {
    this.emit('command', cmd);
  }

  onDriverResponse(rep) {
    switch (rep.type.name) {
			/*
      case 'object_cluster_list':
				// {"type":{"id":32771,"name":"object_cluster_list"},"typeHex":"0x8003","srcEndpoint":1,"profileId":260,"clusters":[0,1,3,4,5,6,8,25,257,4096,768,513,516]}
        var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
        endpoint.addClusters(rep.clusters);
        break;
			*/
			case 'attribute_read':
				this.logger.info("attribute_read received:", rep);

				var device = this.getOrCreateDevice(rep.address);
				var endpoint = device.getEndpoint(rep.endpoint);
				if (!endpoint) {
					endpoint = device.addEndpoint(rep.endpoint);
				}
				var cluster = endpoint.getCluster(rep.cluster.id);
				if (!cluster) {
					cluster = endpoint.addCluster(rep.cluster.id);
				}
				var attribute = cluster.getAttribute(rep.id);
				if (!attribute) {
					attribute = cluster.addAttribute(rep.id);
				}
				attribute.setValue(rep.value);
			break;

			case 'attribute_discovery':
				this.logger.info("attribute_discovery received:", rep);
				break;
      case 'object_attribute_list':
				this.logger.info("object_attribute_list received:", rep);
				break;
			/*
				// {"type":{"id":32772,"name":"object_attribute_list"},"typeHex":"0x8004","srcEndpoint":1,"profileId":260,"clusterId":513,"attributes":[0,3,4,17,18,27,28]}
				var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
				var cluster = endpoint.getOrCreateCluster(rep.clusterId);
        cluster.addAttributes(rep.attributes);

      case 'object_command_list':
				// {"type":{"id":32773,"name":"object_command_list","typeHex":"8005"},"srcEndpoint":1,"profileId":260,"clusterId":8,"commands":[0,1,2,3,4,5,6,7,8]}
				var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
				var cluster = endpoint.getOrCreateCluster(rep.clusterId);
        cluster.addCommands(rep.commands);
        break;
			*/
			case 'attribute_report':
				// {"type":{"id":33026,"name":"attribute_report"},"typeHex":"0x8102","sequence":0,"address":17685,"srcEndpoint":1,"clusterId":0,"attributeId":5,"attributeStatus":0,"attributeType":66,"attributeTypeName":"string","attributeSize":12,"value":"lumi.weather","rssi":201}
				var device = this.getOrCreateDevice(rep.address);
				var endpoint = device.getEndpoint(rep.endpoint);
				if (!endpoint) {
					endpoint = device.addEndpoint(rep.endpoint);
				}
				var cluster = endpoint.getCluster(rep.cluster.id);
				if (!cluster) {
					cluster = endpoint.addCluster(rep.cluster.id);
				}
				var attribute = cluster.getAttribute(rep.attribute);
				if (!attribute) {
					attribute = cluster.addAttribute(rep.attribute);
				}
				attribute.setValue(rep.value);
				break;

			case 'device_remove':
				// {"device_remove", 0x8048, ieee, rejoin, rssi}
				var device = null;
				for (let id in this.devices) {
					if (this.devices[id].ieee === rep.ieee) {
						device = this.devices[id];
						break;
					}
				}
				if (device) {
					delete this.devices[device.address];
					this.logger.log(""+device+": removed.");
					this.emit('device_remove', device);
				}
				else {
					this.logger.warn("device_remove received from '"+rep.ieee+"' but device not registered.");
				}
				break;

			case 'device_announce':
				// {"device_announce",0x4d, address, ieee, mac, alternatePanCoordinator, deviceType, powerSource, receiverOnWhenIdle, securityCapability, allocateAddress, rssi}
				var device = this.getDevice(rep.address);
				if (!this.getDevice(rep.address)) {
					device = this.getOrCreateDevice(rep.address, rep.ieee);
					// calling getOrCreateDevice() will automatically start requests/responses to gather device informations.
				}
				else {
						this.logger.log(""+device+": device_announce received but skipped as this device is already registered.");
				}
				break;

			case 'devices_list':
				// {"devices_list",0x4d, id, address, ieee, battery, linkQuality}
				rep.devices.forEach((devicedef) => {
					var device = this.getDevice(devicedef.address);
					if (!this.getDevice(devicedef.address)) {
						device = this.getOrCreateDevice(devicedef.address, devicedef.ieee);
						// calling getOrCreateDevice() will automatically start requests/responses to gather device informations.
					}
					else {
							this.logger.log("devices_list("+device+"): device definition received but skipped as this device is already registered.");
					}
				});
				break;

			case 'ieee_address':
				// ieee_address(0x8041), sequence:255, status:cmds_success(0x0), ieee:00158d0001b95482, address:0x5d77, start:0, devices:, rssi:0
				if (rep.status.id === 0x00) {
					var device = this.getDevice(rep.address);
					if (device) {
						device.ieee = rep.ieee;
					}
					else {
						this.logger.log(""+device+": ieee_address received but device 0x"+rep.address+" not registered.");
					}
				}
				else {
					this.logger.warn(""+device+": ieee_address request for 0x"+rep.address.toString(16)+"' has failed: "+rep.status+" ; skipping.");
				}
				break;

			case 'active_endpoint':
				// {"active_endpoint",0x8045, sequence, status, address, endpoints, rssi}
				// we get the list of endpoints for this new device.
				// usually received after a 'gatherDeviceInformations_level0_start' which sent an 'active_endpoint'
				this.gatherDeviceInformations_level1_endpoints(rep);
				break;

			case 'descriptor_simple':
				// {"descriptor_simple",sequence, status, address, endpoint, profileId, deviceId, deviceVersion, inClusters, outClusters, rssi}

				// we get the list of clusters for this new device.
				// usually received after a 'gatherDeviceInformations_level1_endpoints'
				// which sent a 'descriptor_simple' following 'active_endpoint'(s)
				this.gatherDeviceInformations_level2_clusters(rep);
				break;
    }
  }

	getDevice(address) {
		return this.devices[address] || null;
	}
  getOrCreateDevice(address, optionalIeeeOnCreate) {
		var device = this.devices[address];
    if (!device) {
			device = new ZiDevice(address, this);
			if (optionalIeeeOnCreate) device.ieee = optionalIeeeOnCreate;
      this.devices[address] = device;
			this.logger.log(""+device+": created.");

			this.emit('device_add', device);

			this.gatherDeviceInformations_level0_start(device)
    }
    return device;
  }

	gatherDeviceInformations_level0_start(device) {
		// 1) send    active_endpoint {target: address}
		this.logger.log("new "+device+" announced ; gathering its endpoints...");
		if (!device.ieee) {
			this.driver.send('ieee_address', { address: device.address });
		}
		this.driver.send('active_endpoint', { address: device.address });
	}
	gatherDeviceInformations_level1_endpoints(rep) {
		// {"type":{"id":32837,"name":"active_endpoint","typeHex":"8045"},"sequence":31,"status":0,"address":29398,"endpoints":[1],"rssi":222}
		var device = this.devices[rep.address];
		if (!device) {
			this.logger.error("gatherDeviceInformations_level1_endpoints - device("+rep.address+") not registered yet.");
			return;
		}
		this.logger.log("endpoints of "+device+" retrieved: "+rep.endpoints+" ; gathering clusters...");
		// 3) for each (enpoint) - send descriptor_simple {target: address, endpoint}
		rep.endpoints.forEach((endpointId) => {
			var endpoint = device.getEndpoint(endpointId);
			if (!endpoint) {
				endpoint = device.addEndpoint(endpointId);
			}
			this.driver.send('descriptor_simple', {address: rep.address, endpoint:endpointId});

			// first attempt to get genBasic::manufacturerName (4)  & genBasic/::modelId (5)
			this.driver.send("attribute_read", { address: rep.address, endpoint: endpointId, cluster: 0, attributes:[4,5]})
		});
	}
	gatherDeviceInformations_level2_clusters(rep) {
		// {"descriptor_simple",sequence, status, address, endpoint, profileId, deviceId, deviceVersion, inClusters, outClusters, rssi}
		// 4) for each (enpoint) - parse  descriptor_simple {address, endpoint, inClusters, outClusters, profileId, deviceId, deviceVersion, etc...}
		var device = this.devices[rep.address];
		if (!device) {
			this.logger.error("descriptor_simple received, but device '"+rep.address+"' not found.");
			return;
		}

		var endpoint = device.getEndpoint(rep.endpoint);
		if (!endpoint) {
			endpoint = device.addEndpoint(rep.endpoint);
		}
		endpoint.deviceId = rep.deviceId;
		endpoint.deviceVersion = rep.deviceVersion;

		this.logger.log(""+device+""+endpoint+" clusters retrieved in="+rep.inClusters+" ; out="+rep.outClusters+" ; gathering attributes...");

		rep.inClusters.forEach((clusterId) => {
			var cluster = endpoint.getCluster(clusterId);
			if (!cluster) {
				cluster = endpoint.addCluster(clusterId);
			}
		});
		rep.outClusters.forEach((clusterId) => {
			var cluster = endpoint.getCluster(clusterId);
			if (!cluster) {
				cluster = endpoint.addCluster(clusterId);
			}
		});
	}

}

module.exports = ZiCoordinator;
