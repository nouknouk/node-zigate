const EventEmitter = require('events').EventEmitter;

const Sym = require('./symbols.js');
const Driver = require('../driver/driver.js');

const Device = require('./device.js');
const DeviceTypes = require('./deviceTypes.js');

const ZiEndpoint = require('./ziendpoint.js');
const ZiCluster = require('./zicluster.js');
const ZiAttribute = require('./ziattribute.js');
const ZiCommand = require('./zicommand.js');
const DeviceLoadSave = require('./deviceLoadSave.js');

const Value = require('./value.js');
const Action = require('./action.js');
const Event = require('./event.js');

const COORDINATOR_LOGGERS = {
	nolog:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: ()=>{},       },
	console: { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	trace:   { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	debug:   { trace: ()=>{},        debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	info:    { trace: ()=>{},        debug: ()=>{},        info: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: console.error },
};

class Coordinator extends EventEmitter {
  constructor(options) {
		super();

		options = options || {
			log: 'nolog',           // 'console'
			loadsavepath: null,     // './zigate_data.json'
			devicespath: null,      // './devices'
			commandspath: null,			// './driver/commands'
			responsespath: null,	  // './driver/responses'
		};

		this[Sym.LOG] = (typeof(options.log) === 'object' && options.log)
										|| COORDINATOR_LOGGERS[options.log]
										|| COORDINATOR_LOGGERS['nolog'];

    this.driver = new Driver(options);
    this.driver.on('open', this.onDriverOpen.bind(this));
    this.driver.on('close', this.onDriverClose.bind(this));
    this.driver.on('error', this.onDriverError.bind(this));
    this.driver.on('command', this.onDriverCommand.bind(this));
    this.driver.on('response', this.onDriverResponse.bind(this));

		this[Sym.VERSION_MAJOR] = null;
		this[Sym.VERSION_INSTALLER] = null;
    this[Sym.STATUS] = 'stopped';
		this.inclusionStatus = false;
    this[Sym.DEVICES] = {};
		this.deviceTypes = new DeviceTypes(this, {
			commandspath: options.commandspath,
			responsespath: options.responsespath,
			log: (this.log.getLogger ? this.log.getLogger('devicetypes') : this.log)
		});
		this.loadsave = (options.loadsavepath ? new DeviceLoadSave(this, options) : null);
  }

  static get LOGGERS() { return COORDINATOR_LOGGERS; };

	get log() { return this[Sym.LOG]; }
	get firmware() {
		let firm = "";
		if (!this[Sym.VERSION_MAJOR] || !this[Sym.VERSION_INSTALLER]) return null;

		let major = Math.floor(this[Sym.VERSION_INSTALLER] /16 /16);
		let minor = this[Sym.VERSION_INSTALLER] - major * 16 * 16;

		firm +=  + major.toString(16)+"."+(minor < 16 ? '0' : '') + minor.toString(16);
		return firm;
	}
  get status() { return this[Sym.STATUS]; }
  get started() { return this.driver.isOpen }
	get devices() { return Object.values(this[Sym.DEVICES]); }
	device(address) { return this[Sym.DEVICES][address] || null; }

  send(cmdname, options) { return this.driver.send(cmdname, options); }

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///                   COORDINATOR ACTIONS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

  start(port, options) {

    // called with only 1 arg, 'options'
    options = (port && typeof(port) === 'object') ? port : (options || {});
    // called with 2 args, store 'port' into options.port
    options.port = (port && typeof(port) === 'string') ? port : options.port;

    // if no port provided at all, it will guess automatically the right one and open it.

    if (!this.started) {
      this[Sym.STATUS] = 'starting';
      this.log.info("starting zigate driver...");
      return this.driver.open(options.port)
			.then(() => { this.driver.send('channel_mask', {mask: 11}); })
			.then(() => { this.driver.send('device_type', {type: 'coordinator'}); })
      .then(()=> {
        this[Sym.STATUS] = 'started';
        this.log.info("zigbee network is up ; starting devices discovery...");
				this.driver.send('network_state');
				this.driver.send('version');
      },
      (err)=> {
        this[Sym.STATUS] = 'stopped';
        this.log.error("zigate driver start failed: ", err)
        this.emit('error', err);
				return Promise.reject(err);
      })
    }
    else {
      var err = new Error("coordinator is already started")
      this.log.info("attempt to restart zigate coordinator, while it is already started. no-op.");
      return Promise.resolve("already started");
    }
  }
  stop() {
    if (this.started) {
      this[Sym.STATUS] = 'stopping';
      return this.driver.close().then(
        ()=> {
          this[Sym.STATUS] = 'stopped';
					this.inclusionStatus = false;
          this.log.info("stopped.");
          this.emit('stop');
        },
        (err) => {
					this.log.warn("attempt to stop zigate coordinator, while it is already stopped. no-op.");
          return Promise.resolve("already stopped");
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
          this.log.info("reset done.");
          this.emit('reset');
        },
        (err) => {
          this.emit('error', "reset error: "+err);
					throw "reset error: "+err;
        }
      );
    }
    else {
      this.log.warn("reset failed: not started yet")
      return Promise.reject("not started");
    }
  }
	startInclusion(timeInSec) {
		let duration = timeInSec;
		if (this.started) {
			return this.driver.send('permit_join', {duration: duration}).then(
        (commandOrStatus)=> {
          this.log.info("inclusion mode started for "+duration+" seconds.");
					this.inclusionStatus = true;
          this.emit('inclusion_start');
					setTimeout(()=> {
						if (this.inclusionStatus) {
							this.inclusionStatus = false;
							this.emit('inclusion_stop');
						}
					}, duration*1000);
        },
        (err) => {
          this.emit('error', "start inclusion error: "+err);
          return Promise.reject(""+err);
        }
			);
		}
		else {
      this.log.warn("reset failed: not started yet.")
      return Promise.reject("not started yet");
    }
	}

	exclude(deviceOrAddress) {
		let address = (deviceOrAddress && deviceOrAddress.address) ? deviceOrAddress.address : deviceOrAddress;
		let device = this.device(address);
		if (device) {
			this.log.debug(""+device+" : device remove request sent");
			this.emit('device_remove_pending', device);

			return this.driver.send({
				type: 'device_remove',
				address: device.hex,
				extended: device.ieee,
			});
		}
		else {
			console.error("unknown device or address ",deviceOrAddress);
			return Promise.reject("UNKNOWN_DEVICE");
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///                   MANAGE DEVICES' DATA
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	addDevice(address, optionalIeee) {
    let device = this.device(address);
		if (!device) {
			device = new Device(this, address);
			if (typeof(optionalIeee) !== 'undefined') { device.ieee = optionalIeee; }
			this[Sym.DEVICES][address] = device;
			this.log.debug(""+device+" : device created");
			this.emit('device_add', device);
		}
		return device;
	}

	removeDevice(device, rejoin) {
		rejoin = !!rejoin;
		// {"device_remove", 0x8048, ieee, rejoin, rssi}
		var device = this.devices.find(d => d.address === device.address);
		if (device) {
			delete this[Sym.DEVICES][device.address];
			device[Sym.DESTROY]();
			this.log.info(""+device+" removed from network (rejoin="+rejoin+")");
			this.emit('device_remove', device, rejoin);
			return true;
		}
		else {
			this.log.error("removeDevice("+device+"): device is not registered in coordinator.");
			return false;
		}
	}

	addEndpoint(device, id, verified) {
		if (!device[Sym.ENDPOINTS][id]) {
			let endpoint = new ZiEndpoint(id, device, verified);
			device[Sym.ENDPOINTS][id] = endpoint;
			this.log.debug(""+device+""+endpoint+" : endpoint created");
			device[Sym.ON_ENDPOINT_ADD](endpoint);
			this.emit('endpoint_add', endpoint);
		}
		return device[Sym.ENDPOINTS][id];
	}

	addCluster(endpoint, id, verified) {
		if (!endpoint[Sym.CLUSTERS][id]) {
			let cluster = new ZiCluster(id, endpoint, verified);
			endpoint[Sym.CLUSTERS][id] = cluster;
			this.log.debug(""+endpoint.device+""+endpoint+""+cluster+" : cluster created");
			endpoint.device[Sym.ON_CLUSTER_ADD](cluster);
			this.emit('cluster_add', cluster);
		}
		return endpoint[Sym.CLUSTERS][id];
	}

	addAttribute(cluster, id, value, verified) {
		if (!cluster[Sym.ATTRIBUTES][id]) {
			let device = cluster.device;
			let endpoint = cluster.endpoint;
			let attribute = new ZiAttribute(id, cluster, value, verified);
			this.log.debug(""+device+""+endpoint+""+cluster+""+attribute+": attribute created");
			cluster[Sym.ATTRIBUTES][id] = attribute;
			cluster.device[Sym.ON_ATTRIBUTE_ADD](attribute);
			this.emit('attribute_add', attribute);
			if (this.deviceTypes.attributesForDeviceIdentification.find((at) => at.cluster === cluster.id && at.attribute === id)) {
				let besttype = this.deviceTypes.getBestDeviceType(cluster.device);
				if (besttype.id !== device.type) {
					this.setDeviceType(device, besttype);
				}
			}
		}
		return cluster[Sym.ATTRIBUTES][id];
	}
	writeAttribute(attribute, value) {
		let oldval = attribute.value;
		return this.driver.send({
			type: 'attribute_write',
			address: attribute.device[Sym.ADDRESS],
			endpoint:attribute.endpoint.id,
			cluster:attribute.cluster.id,
			attribute:attribute.id, value: val
		})
		.then((rep) => {
			attribute[Sym.SET_ATTR_DATA](rep.value);
			this.log.debug(""+attribute.device+attribute.endpoint+attribute.cluster+attribute+": attribute written");
			attribute.device[Sym.ON_ATTRIBUTE_CHANGE](attribute, value, oldval)
			this.emit('attribute_change', attribute, value, oldval);
			return rep.value;
		});
	}
	refreshAttribute(attribute) {
		let oldval = attribute.value;
		return attribute.device[Sym.COORDINATOR].driver.send({
			type: 'attribute_read',
			address: attribute[Sym.ADDRESS],
			endpoint:attribute.endpoint.id,
			cluster:attribute.cluster.id,
			attributes:[attribute.id],
		}).then((r) => {
			attribute[Sym.SET_ATTR_DATA](rep.value);
			this.log.debug(""+attribute.device+attribute.endpoint+attribute.cluster+attribute+": attribute refresh requested");
			attribute.device[Sym.ON_ATTRIBUTE_CHANGE](attribute, value, oldval)
			this.emit('attribute_change', attribute, rep.value, oldval);
			return rep.value;
		});
	}

	addCommand(cluster, id, verified) {
		if (!cluster[Sym.COMMANDS][id]) {
			let command = new ZiCommand(id, cluster, verified);
			cluster[Sym.COMMANDS][id] = command;
			this.log.debug(""+cluster.endpoint.device+""+cluster.endpoint+""+cluster+""+command+": command created");
			cluster.device[Sym.ON_COMMAND_ADD](command);
			this.emit('command_add', command);
		}
		return cluster[Sym.COMMANDS][id];
	}
	execCommand(command, args) {
			throw new Error("not implemented yet");
	}

	addValue(device, id, definition) {
		if (device.value(id)) throw new Error("cannot add value '"+id+"': value already exists.");
		let value = new Value(id, device, definition);
		device[Sym.VALUES][id] = value;
		value[Sym.SETUP](value.definition);
		this.log.debug(""+device+""+value+": value created");
		device[Sym.ON_VALUE_ADD](value);
		this.emit('value_add', value);
		return value;
	}
	removeValue(device, id) {
		let value = device.value(id);
		if (!value) throw new Error("cannot remove value '"+id+"': value doesn't exist.");
		value[Sym.DESTROY]();
		delete device[Sym.VALUES][id];
		this.log.debug(""+device+""+value+": value removed");
		device[Sym.ON_VALUE_REMOVE](value);
		this.emit('value_remove', value);
		return value;
	}
	setValue(value, newval, updateBoundAttribute) {
		let oldval = value[Sym.VALUE_DATA];
    let promise = Promise.resolve(newval);
    if (updateBoundAttribute && value[Sym.VALUE_BOUND_ATTR]) {
      let attrval = value[Sym.VALUE_BOUND_ATTR].value;
			if (value.definition && value.definition.attribute && value.definition.attribute.fromValue) {
				attrval = value.definition.attribute.fromValue(attrval);
			}
      promise = promise.then( () => { updateBoundAttribute.write(attrval) })
    }
    promise = promise.then( () => {
      value[Sym.SET_VALUE_DATA](newval);
      value.device[Sym.ON_VALUE_CHANGE](value, newval, oldval);
      this.emit('value_change', value, newval, oldval);
    });
    return promise;
  }

	addAction(device, id, definition) {
		if (device.action(id)) throw new Error("cannot add action '"+id+"': action already exists.");
		let action = new Action(id, device, definition);
		device[Sym.ACTIONS][id] = action;
		action[Sym.SETUP](action.definition);
		this.log.debug(""+device+""+action+": action created");
		device[Sym.ON_ACTION_ADD](action);
		this.emit('action_add', action);
		return action;
	}
	removeAction(device, id) {
		let action = device.action(id);
		if (!action) throw new Error("cannot remove action '"+id+"': action doesn't exist.");
		action[Sym.DESTROY]();
		delete device[Sym.ACTIONS][id];
		this.log.debug(""+device+""+action+": action removed");
		device[Sym.ON_ACTION_REMOVE](action);
		this.emit('action_remove', action);
		return action;
	}
	execAction(action, args) {
		this.log.debug(""+action.device+""+action+": action executed");
		let ret = action[Sym.EXEC_ACTION](args);
		action.device[Sym.ON_ACTION_EXEC](action, args, ret)
		this.emit('action_exec', action, args, ret);
		return ret;
	}

	addEvent(device, id, definition) {
		if (device.event(id)) throw new Error("cannot add event '"+id+"': event already exists.");
		let event = new Event(id, device, definition);
		device[Sym.EVENTS][id] = event;
		event[Sym.SETUP](event.definition);
		this.log.debug(""+device+""+event+": event created");
		device[Sym.ON_EVENT_ADD](event);
		this.emit('event_add', event);
		return event;
	}
	removeEvent(device, id) {
		let event = device.event(id);
		if (!value) throw new Error("cannot remove event '"+id+"': event doesn't exist.");
		event[Sym.DESTROY]();
		delete device[Sym.EVENTS][id];
		this.log.debug(""+device+""+event+": event removed");
		device[Sym.ON_EVENT_REMOVE](event);
		this.emit('event_remove', event);
		return event;
	}
	fireEvent(event, args) {
		this.log.debug(""+event.device+""+event+": event fired");
		event[Sym.EVENT_FIRE](args);
		event.device[Sym.ON_EVENT_FIRE](event, args)
		this.emit('event_fire', event, args);
	}
	setDeviceType(device, typedefinition) {
		let oldtypename = device.type;
		this.deviceTypes.assignTypeToDevice(typedefinition, device);
		let newtypename = device.type;
    this.log.debug("setDeviceType("+device+"): from '"+oldtypename+"' to '"+newtypename+"'...");
		if (newtypename !== oldtypename) {
			device[Sym.ON_TYPE_CHANGE](newtypename, oldtypename);
			this.emit('type_change', device, newtypename, oldtypename);
		}
	}
  setDeviceBattery(device, isBattery) {
    if (device[Sym.BATTERY] !== isBattery) {
      let oldBattery = device[Sym.BATTERY];
      device[Sym.BATTERY] = isBattery;
      device[Sym.ON_BATTERY_CHANGE](isBattery, oldBattery);
      this.emit('device_battery_change', device, isBattery, oldBattery);
    }
  }
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///                   QUERIES
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	queryDevices() {
		return this.driver.send('devices_list', { /*noparam*/ })
		.then((rep) => { return this.onResponseDevicesList(rep); });
	}
	onResponseDevicesList(rep) {
		// rep.devices = [ { id, address, ieee, battery, linkQuality}, ...]

		// 1a) find all devices instances no longer listed by the zigate's response
		this.devices.filter( dev => !(rep.devices.find(zidev => zidev.address === dev.address)) )
			// 1b) remove them from the coordinator
			.forEach(olddevice => { this.removeDevice(olddevice); });

		// 2a) find devices listed in zigate's response not yet present in coordinator
		rep.devices.filter( zidev => !(this.device(zidev.address)))
			// 2b) remove them from the coordinator
			.forEach(zidev => { this.addDevice(zidev.address, zidev.ieee); });

    // 3) for each device, update battery info
    rep.devices.forEach(zidev => { this.setDeviceBattery(this.device(zidev.address), zidev.battery); });

		return rep;
	}

	queryEndpoints(device) {
		return this.driver.send('active_endpoint', { address: device.address })
		.then((rep) => { return this.onResponseActiveEndpoint(rep); });
	}
	onResponseActiveEndpoint(rep) {
		// active_endpoint(0x8045), sequence:31, status:0, address:29398, endpoints:[1], rssi:222}
		var device = this.device(rep.address) || this.addDevice(rep.address);
		rep.endpoints.forEach((id) => device.addEndpoint(id, /*verified*/ true));
		return rep;
	}

	queryClusters(endpoint) {
		return this.driver.send('descriptor_simple', {address: endpoint.device.address, endpoint:endpoint.id} )
		.then((rep) => { return this.onResponseDescriptorSimple(rep); });
	}

	onResponseDescriptorSimple(rep) {
		// {"descriptor_simple",sequence, status, address, endpoint, profileId, deviceId, deviceVersion, inClusters, outClusters, rssi}
		let device = this.device(rep.address) || this.addDevice(rep.address);
		let endpoint = device.endpoint(rep.endpoint) || device.addEndpoint(rep.endpoint, /*verified*/ true);
		endpoint.verified = true;

		rep.inClusters.forEach((clusterId) => {
			var cluster = endpoint.cluster(clusterId) || endpoint.addCluster(clusterId, /*verified*/ true);
			cluster.verified = true;
		});
		rep.outClusters.forEach((clusterId) => {
			var cluster = endpoint.cluster(clusterId) || endpoint.addCluster(clusterId, /*verified*/ true);
			cluster.verified = true;
		});
		return rep;
	}


	queryAttributes(cluster) {
		return this.driver.send('attribute_discovery', {address: cluster.device.address, endpoint: cluster.endpoint.id, firstId: 0, count: 5} )
		.then((rep) => { return this.onResponseAttributeDiscovery(rep, cluster); });
	}
	onResponseAttributeDiscovery(rep, cluster) {
		if (!cluster) {
			throw "attribute_discovery received ; no device/cluster IDs available in response ?";
		}
		// attribute_discovery(0x8140), complete, type, id}
		if (!cluster.attribute(rep.id)) {
			cluster.addAttribute(rep.id, /*verified*/ true);
		}
		return rep;
	}


	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	///                   DRIVER CALLBACKS
	///////////////////////////////////////////////////////////////////////////////////////////////////////////


  onDriverOpen() {
    this[Sym.DEVICES] = {};
    this.emit('started');
  }

  onDriverClose() {
    this.emit('stopped');
    this[Sym.DEVICES] = {};
  }

  onDriverError(err) {
    this.emit('error', err);
  }

  onDriverCommand(cmd) {
    this.emit('command', cmd);
  }

  onDriverResponse(rep) {

		let deviceFromAddress = rep.address && this.device(rep.address);
		if (deviceFromAddress) {
			if (rep.type.name) this.emit('device_message_'+rep.type.name, deviceFromAddress, rep);
			this.emit('device_message', deviceFromAddress, rep);
		}

    switch (rep.type.name) {
			case 'version':
				this[Sym.VERSION_MAJOR] = rep.major;
				this[Sym.VERSION_INSTALLER] = rep.installer;
				this.log.debug("version info received. major="+rep.major+" ; installer="+rep.installer+" ; firmware=", this.firmware);
        break;
      case 'object_cluster_list':
				// {"type":{"id":0x8003,"name":"object_cluster_list"},"srcEndpoint":1,"profileId":260,"clusters":[0,1,3,4,5,6,8,25,257,4096,768,513,516]}
				this.log.error("'object_cluster_list' received but I don't know to which device the clusters are bound.");
				this.log.error(rep);
        break;
      case 'object_attribute_list':
				// {"type":{"id":0x8004,"name":"object_attribute_list"},"srcEndpoint":1,"profileId":260,"clusterId":513,"attributes":[0,3,4,17,18,27,28]}
				this.log.error("'object_attribute_list' received  but I don't know to which device the clusters are bound.");
				this.log.error(rep);
        break;
      case 'object_command_list':
				// {"type":{"id":0x8005,"name":"object_command_list","srcEndpoint":1,"profileId":260,"clusterId":8,"commands":[0,1,2,3,4,5,6,7,8]}
				this.log.error("'object_command_list' received  but I don't know to which device the clusters are bound.");
				this.log.error(rep);
        break;

			case 'attribute_report':
				// {"type":{"id":33026,"name":"attribute_report"},"typeHex":"0x8102","sequence":0,"address":17685,"srcEndpoint":1,"clusterId":0,"attributeId":5,"attributeStatus":0,"attributeType":66,"attributeTypeName":"string","attributeSize":12,"value":"lumi.weather","rssi":201}
				var device = this.device(rep.address) || this.addDevice(rep.address);
				var endpoint = device.endpoint(rep.endpoint) || device.addEndpoint(rep.endpoint, /*verified*/ true);
				endpoint.verified = true;
				var cluster = endpoint.cluster(rep.cluster.id) || endpoint.addCluster(rep.cluster.id, /*verified*/ true);
				cluster.verified = true;

				var attribute = cluster.attribute(rep.attribute);
				if (!attribute) {
					attribute = cluster.addAttribute(rep.attribute, rep.value, /*verified*/ true);
				}
				else {
					let oldval = attribute.value;
					attribute[Sym.SET_ATTR_DATA](rep.value);
					attribute.device[Sym.ON_ATTRIBUTE_CHANGE](attribute, rep.value, oldval)
					this.emit('attribute_change', attribute, rep.value, oldval);

					if (this.deviceTypes.attributesForDeviceIdentification.find((at) => at.cluster === cluster.id && at.attribute === rep.attribute)) {
						let besttype = this.deviceTypes.getBestDeviceType(device);
						if (besttype.id !== device.type) {
							this.log.debug("found better device type definition for '"+device+"' : "+besttype+". Upgrading...");
							this.setDeviceType(device, besttype);
						}
					}
				}
				break;

      case 'zone_status_change':
      // zone_status_change(0x8401), sequence:12, endpoint:1, cluster:ssIasZone(0x500), addressmode:short(0x2), address:0x7c97, zonestatus:1, extendedstatus:0, zoneid:255, delay:0, rssi:84
      // { "cluster": 1280, "id": 2, "name": "zoneStatus", "type": "bitmap16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },

      var device = this.device(rep.address) || this.addDevice(rep.address);
      var endpoint = device.endpoint(rep.endpoint) || device.addEndpoint(rep.endpoint, /*verified*/ true);
      endpoint.verified = true;
      var cluster = endpoint.cluster(rep.cluster.id) || endpoint.addCluster(rep.cluster.id, /*verified*/ true);
      cluster.verified = true;

      var attribute = cluster.attribute(/*zoneStatus*/ 2);
      if (!attribute) {
        attribute = cluster.addAttribute(/*zoneStatus*/ 2, rep.zonestatus, /*verified*/ true);
      }
      else {
        let oldval = attribute.value;
        attribute[Sym.SET_ATTR_DATA](rep.zonestatus);
        attribute.device[Sym.ON_ATTRIBUTE_CHANGE](attribute, rep.zonestatus, oldval)
        this.emit('attribute_change', attribute, rep.zonestatus, oldval);

        if (this.deviceTypes.attributesForDeviceIdentification.find((at) => at.cluster === cluster.id && at.attribute === rep.zonestatus)) {
          let besttype = this.deviceTypes.getBestDeviceType(device);
          if (besttype.id !== device.type) {
            this.log.debug("found better device type definition for '"+device+"' : "+besttype+". Upgrading...");
            this.setDeviceType(device, besttype);
          }
        }
      }
      break;

			case 'device_remove':
				// {"device_remove", 0x8048, ieee, rejoin, rssi}
				var device = this.devices.find(d => d.ieee === rep.ieee);
				if (device) {
					this.removeDevice(device, rep.rejoin);
				}
				else {
					this.log.error("device_remove received from '"+rep.ieee+"' but device is not registered in coordinator.");
				}
				break;

			case 'device_announce':
				// {"device_announce",0x4d, address, ieee, mac, alternatePanCoordinator, deviceType, powerSource, receiverOnWhenIdle, securityCapability, allocateAddress, rssi}
				var device = this.device(rep.address);
				if (!device) {
					device = this.addDevice(rep.address, rep.ieee);
					// calling getOrCreateDevice() will automatically start requests/responses to gather device informations.
				}
				else {
						this.log.debug(""+device+": device_announce received but skipped as this device is already registered.");
				}
        device.battery = !rep.mainsPowerSource
				break;
      case 'descriptor_node':
        let dev = this.device(rep.address);
        dev.battery = !rep.ACpowerCource;
        break;

			case 'network_state':
				// boot sequence: check if first start of the zigate, or after a 'erase_persistent_data'
				// if no network setup yet (ie. ieeepanid == '0000000000000000'), we need first to start a new network
				if (!rep.networkUp) {
					this.log.error("network_state returned networkUp = false. Panic mode.");
				}
				else if (rep.ieeepanid === '0000000000000000') {
					this.log.warn("no network defined yet ; starting a new one ( = one shot zigate initialization)");
					this.driver.send('start_network');
				}
				else {
						this.log.debug("(existing) network is ready ; gathering devices' list.");
						this.driver.send('devices_list');
				}
				break;
			case 'network_joined':
				// response to initial new network start (cf. above)
				// rep.status.name = [ 0: 'joined_existing_network' or 1: 'formed_new_network']
				this.log.warn("new network created ; gathering devices' list.");
				this.driver.send('devices_list');
				break;
			case 'devices_list':
				// {"devices_list",0x4d, id, address, ieee, battery, linkQuality}
				this.onResponseDevicesList(rep);
				break;

			case 'ieee_address':
				// ieee_address(0x8041), sequence:255, status:cmds_success(0x0), ieee:00158d0001b95482, address:0x5d77, start:0, devices:, rssi:0
				if (rep.status.id === 0x00) {
					var device = this.device(rep.address);
					if (!device) {
						device = this.addDevice(rep.address, rep.ieee);
					}
					else {
						device.ieee = rep.ieee;
					}
				}
				else {
					this.log.warn(""+device+": ieee_address request for 0x"+rep.address.toString(16)+"' has failed: "+rep.status+" ; skipping.");
				}
				break;

			case 'active_endpoint':
				this.onResponseActiveEndpoint(rep);
				break;

			case 'descriptor_simple':
				// we get the list of in/out clusters for a device.
				this.onResponseDescriptorSimple(rep);
				break;
			case 'attribute_discovery':
				this.onResponseAttributeDiscovery(rep);
				break;
    }
  }

	/* discovering roadmap:

		1) we received a 'device_announce'

		2a) send 'ieee_address' to get device's address
		2b) send 'active_endpoint' to get list of endpoints

		3) forEach(endpoint), send 'descriptor_simple' to get list of  clusters

	*/

}

module.exports = Coordinator;
