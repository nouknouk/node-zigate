const EventEmitter = require('events').EventEmitter;
const ZiDriver = require('../driver/zidriver.js');
const ZiDevice = require('./zidevice.js');
const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');

const ZIMANAGER_LOGGERS = {
	console: { log: console.log, warn: console.warn, error: console.error, debug: console.debug },
	nolog:   { log: ()=>{},          warn: ()=>{},           error: ()=>{},            debug: ()=>{} },
};

/* =========================== ZiDriver events ===================================
	'start', 'stop', 'error',
*/

class ZiManager extends EventEmitter {
  constructor(options) {
		options = options || {};
    super();

    this.logger = typeof(options.logger) === 'object' ? options.logger : ZIMANAGER_LOGGERS[options.logger  || 'nolog'];
		ZiDevice.LOGS = ZiEndpoint.LOGS = ZiCluster.LOGS = ZiAttribute.LOGS = ZiCommand.LOGS = this.logger;

    this.driver = new ZiDriver(options);
    this.driver.on('open', this.onDriverOpen.bind(this));
    this.driver.on('close', this.onDriverClose.bind(this));
    this.driver.on('error', this.onDriverError.bind(this));
    this.driver.on('command', this.onDriverCommand.bind(this));
    this.driver.on('response', this.onDriverResponse.bind(this));

    this.mgrStatus = 'stopped';
		this.inclusionStatus = false;
    this.devices = {};
  }
  static get LOGGERS() { return ZIMANAGER_LOGGERS; };

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
			.then(this.driver.send('set_channel_mask', {mask: 11}))
			.then(this.driver.send('set_device_type', {type: 'coordinator'}))
      .then(()=> {
        this.mgrStatus = 'started';
        this.logger.log("[ZiManager] started on port '"+this.driver.port+"'.");
        this.emit('start');
      },
      (err)=> {
        this.mgrStatus = 'stopped';
        this.logger.log("[ZiManager] start failed: ", err)
        this.emit('error', err);
      })
    }
    else {
      var err = new Error("manager is already started")
      this.logger.log("[ZiManager] start failed: ", err)
      this.emit('error', err);
      return Promise.reject(err);
    }
  }
  stop() {
    if (this.started) {
      this.mgrStatus = 'stopping';
      return driver.close().then(
        ()=> {
          this.mgrStatus = 'stopped';
					this.inclusionStatus = false;
          this.logger.log("[ZiManager] stopped.");
          this.emit('stop');
        },
        (err) => {
          err = new Error("manager is already stopped")
          this.logger.log("[ZiManager] stop failed: ", err)
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
          this.logger.log("[ZiManager] reset done.");
          this.emit('reset');
        },
        (err) => {
          err = new Error("(ZiManager] reset error: "+err)
          this.emit('error', err);
          return Promise.reject(err);
        }
      );
    }
    else {
      var err = new Error("manager is not started yet");
      this.logger.log("[ZiManager] reset failed: ", err)
      this.emit('error', err);
      return Promise.reject(err);
    }
  }
	startInclusion(timeInSec) {
		if (this.started) {
			return this.driver.send('permit_join_request', {duration: timeInSec}).then(
        (command)=> {
          this.logger.log("[ZiManager] inclusion mode started for "+command.options.duration+" seconds.");
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
          err = new Error("(ZiManager] start inclusion error: "+err)
          this.emit('error', err);
          return Promise.reject(err);
        }
			);
		}
		else {
      var err = new Error("manager is not started yet");
      this.logger.log("[ZiManager] reset failed: ", err)
      this.emit('error', err);
      return Promise.reject(err);
    }
	}
  onDriverOpen() {
    this.devices = {};
    this.emit('started')
  }

  onDriverClose() {
    this.emit('stopped')
  }

  onDriverError(err) {
    this.emit('error', err)
  }

  onDriverCommand(cmd) {
    this.emit('command', cmd)
  }

  onDriverResponse(rep) {
    switch (rep.type.name) {
      case 'object_cluster_list':
				// {"type":{"id":32771,"name":"object_cluster_list"},"typeHex":"0x8003","srcEndpoint":1,"profileId":260,"clusters":[0,1,3,4,5,6,8,25,257,4096,768,513,516]}
        var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
        endpoint.addClusters(rep.clusters);
        break;
      case 'object_attribute_list':
				// {"type":{"id":32772,"name":"object_attribute_list"},"typeHex":"0x8004","srcEndpoint":1,"profileId":260,"clusterId":513,"attributes":[0,3,4,17,18,27,28]}
				var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
				var cluster = endpoint.getOrCreateCluster(rep.clusterId);
        cluster.addAttributes(rep.attributes);
        break;
      case 'object_command_list':
				// {"type":{"id":32773,"name":"object_command_list","typeHex":"8005"},"srcEndpoint":1,"profileId":260,"clusterId":8,"commands":[0,1,2,3,4,5,6,7,8]}
				var device = this.getOrCreateDevice(rep.srcEndpoint); //// <<<<<<==================== to fix !!!!!!!!!! ====================
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
				var cluster = endpoint.getOrCreateCluster(rep.clusterId);
        cluster.addCommands(rep.commands);
        break;
			case 'attribute_report':
				// {"type":{"id":33026,"name":"attribute_report"},"typeHex":"0x8102","srcSequence":0,"srcAddress":17685,"srcEndpoint":1,"clusterId":0,"attributeId":5,"attributeStatus":0,"attributeType":66,"attributeTypeName":"string","attributeSize":12,"value":"lumi.weather","rssi":201}
				var device = this.getOrCreateDevice(rep.srcAddress);
				var endpoint = device.getOrCreateEndpoint(rep.srcEndpoint);
				var cluster = endpoint.getOrCreateCluster(rep.clusterId);
				var attribute = cluster.getOrCreateAttribute(rep.attributeId);
				attribute.setValue(rep.value);
				break;
			case 'leave_indication':
				// {"type":{"id":32840,"name":"leave_indication"},"typeHex":"0x8048","ieeeAddress":"00158d0001b95482","rejoinStatus":0,"rssi":201}
				var device = null;
				for (var id in this.devices) {
					if (this.devices[id].ieeeAddress === rep.ieeeAddress) {
						device = this.devices[id];
						break;
					}
				}
				if (device) {
					delete this.devices[id];
					this.logger.log(""+device+": removed.");
				}
				else {
					this.logger.warn(""+this.devices[id]+": leave_indication received but device not registered.");
				}
				break;
			case 'device_announce':
				// {"type":{"id":77,"name":"device_announce"},"typeHex":"0x4d","shortAddress":17685,"ieeeAddress":"00158d0001b95482","mac":128,"alternatePanCoordinator":false,"deviceType":false,"powerSource":false,"receiverOnWhenIdle":false,"reserved":false,"securityCapability":false,"allocateAddress":false,"rssi":201}
				var device = this.getDevice(rep.shortAddress);
				if (!this.getDevice(rep.shortAddress)) {
					device = this.getOrCreateDevice(rep.shortAddress);
					device.ieeeAddress = rep.ieeeAddress;
					device.mac = rep.mac;
					device.alternatePanCoordinator = rep.alternatePanCoordinator;
					device.deviceType = rep.deviceType;
					device.powerSource = rep.powerSource;
					device.receiverOnWhenIdle = rep.receiverOnWhenIdle;
					device.reserved = rep.reserved;
					device.securityCapability = rep.securityCapability;
					device.allocateAddress = rep.allocateAddress;
					device.rssi = rep.rssi;
				}
				else {
						this.logger.log(""+device+": leave_indication received but this device is not registered.");
				}
				break;
			case 'active_endpoint_response':
				// we get the list of endpoints for this new device.
				// usually received after a 'gatherDeviceInformations_level0_start' which sent an 'active_endpoint_request'
				this.gatherDeviceInformations_level1_endpoints(rep);
				break;
			case 'simple_descriptor_response':
				// we get the list of clusters for this new device.
				// usually received after a 'gatherDeviceInformations_level1_endpoints' 
				// which sent a 'simple_descriptor_request' following 'active_endpoint_response'(s)
				this.gatherDeviceInformations_level2_clusters(rep);
				break;
    }
  }

	getDevice(id) {
		return this.devices[id] || null;
	}
  getOrCreateDevice(deviceId) {
		var device = this.devices[deviceId];
    if (!device) {
			device = new ZiDevice(deviceId);
      this.devices[deviceId] = device;
			this.logger.log(""+device+": created.");
			this.gatherDeviceInformations_level0_start(deviceId)
    }
    return device;
  }
	
	gatherDeviceInformations_level0_start(deviceId) {
		// 1) send    active_endpoint_request {target: shortAddress}
		this.driver.send('active_endpoint_request', { target: deviceId });
	}
	gatherDeviceInformations_level1_endpoints(rep) {
		// 2) parse   active_endpoint_response = { status, srcAddress, endpoints[] }
		var device = this.devices[srcAddress];
		// 3) for each (enpoint) - send   simple_descriptor_request {target: srcAddress, endpoint}
		rep.endpoints.forEach((endpointId) => {
			var endpoint = device.getOrCreateEndpoint(endpointId);
			this.driver.send('simple_descriptor_request', {target: rep.srcAddress, endpoint:endpointId});
		});
	}
	gatherDeviceInformations_level2_clusters(rep) {
		// 4) for each (enpoint) - parse  simple_descriptor_response {endpoint, inClusters, outClusters, profileId, deviceId, deviceVersion, etc...}
		var device = this.devices[srcAddress];

		var endpoint = device.getOrCreateEndpoint(rep.endpoint);
		endpoint.deviceId = rep.deviceId;
		endpoint.deviceVersion = rep.deviceVersion;
		
		rep.inClusters.forEach((clusterId) => {
			var cluster = endpoint.getOrCreateCluster(clusterId);
		});
		rep.outClusters.forEach((clusterId) => {
			var cluster = endpoint.getOrCreateCluster(clusterId);
		});
	}

}

module.exports = ZiManager;
