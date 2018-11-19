let ELIGIBLE_MODEL_ID = ['Plug 01'];

module.exports = {

  id: 'osram_smart_plus_plug',

  match: function(device) {
    let modelId = device.attribute(3, 0, 5) && device.attribute(3, 0, 5).value;
    if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
  },

  values: {
    modelId:     { type:'string', attribute: {id: '0x0003 0x0000 0x0005' } },
    state:       { type:'bool',   attribute: {id: '0x0003 0x0006 0x0000' } },
  },

  actions: {
    on: { exec: function() { return this.device.send('action_onoff', { address:this.device.address, endpoint: 0x03, on:true }); } },
    off: { exec: function() { return this.device.send('action_onoff', { address:this.device.address, endpoint: 0x03, off:true }); } },
    toggle: { exec: function() { return this.device.send('action_onoff', { address:this.device.address, endpoint: 0x03, toggle:true }); } },
  },

  events: {
    switch_on:  { attribute: { id: '0x0003 0x0006 0X0000', equal: true } },
    switch_off: { attribute: { id: '0x0003 0x0006 0X0000', equal: false } },

  },

};

/*

sending command:    active_endpoint(0x45), address:0x6e25, timestamp:2018-7-11 16:28:12.775
response received:  active_endpoint(0x8045), sequence:106, status:{"id":0,"name":"success","description":"Command was successful"}, address:0x6e25, endpoints:3, rssi:72

sending command:    descriptor_simple(0x43), address:0x6e25, endpoint:3, timestamp:2018-7-11 16:30:10.266
response received:  descriptor_simple(0x8043), sequence:107, status:0, address:0x6e25, length:26, endpoint:3, profile:ll(0xc05e), seviceType:[object Object], deviceVersion:2, reserved:0, inClusters:4096,0,3,4,5,6,2820,64527, outClusters:25, rssi:75

sending command:    descriptor_power(0x44), address:0x6e25, timestamp:2018-7-11 16:34:18.781
          descriptor_power(0x8044), sequence:108, status:0, powerMode:0, availableSource:14, currentSource:2, currentLevel:12, rssi:75

sending command:    descriptor_node(0x42), address:0x6e25, timestamp:2018-7-11 16:35:21.872
response received:  descriptor_node(0x8042), sequence:109, address:0x6e, manufacturer:9659, maxRxSize:43520, maxTxSize:0, serverFlags:[object Object], alternatePanCoordinator:false, deviceType:false, powerSource:false, receiverOnWhenIdle:false, securityCapability:true, allocateAddress:true, maxBufferSize:142, nodeType:end_device(0x2), complexDescriptorAvailable:false, userDescriptorAvailable:false, reserved:0, apsFlags:2, frequencyBand:0, rssi:75


inClusters:4096,0,3,4,5,6,2820,64527, outClusters:25



// 01 81 40   complete  00    type  05    id    af 00     20 00 00 4b

zigate.zigate.driver.send('attribute_discovery', {address:0x6e25, endpoint:3, cluster:0, firstId:18})

cluster 0:    genBasic
  type = 0x20   id = 0x00
  type = 0x20   id = 0x01
  type = 0x20   id = 0x02
  type = 0x20   id = 0x03
  type = 0x42   id = 0x04
  type = 0x42   id = 0x05
  type = 0x42   id = 0x06
  type = 0x30   id = 0x07
  type = 0x10   id = 0x12
  type = 0x42   id = 0x4000

cluster 3:    genDeviceTempCfg
  type = 0x21   id = 0x00

cluster 4:    genGroups
  type = 0x18   id = 0x00

cluster 5:    genScenes
  type = 0x20   id = 0x00
  type = 0x20   id = 0x01
  type = 0x21   id = 0x02
  type = 0x02   id = 0x03
  type = 0x18   id = 0x04

cluster 6:    genOnOff
  type = 0x10   id = 0x00       RO  Mandatory bool   OnOff
  type = 0x10   id = 0x4000     RO  Optional  bool   GlobalSceneControl
  type = 0x21   id = 0x4001     RW  Optional  uint16   OnTime         1/10 second
  type = 0x21   id = 0x4002     RW  Optional  uint16   OffWaitTime      1/10 second

cluster 2820: 0xb04   genElectricalMeasurement
  ????

cluster 64527:  0xfc0f
  ????

out cluster 25: 0x 19 (with directon =1 ; cli_to_srv)   OTA Upgrade
  type = 0xfo   id = 0x00
  type = 0x23   id = 0x01
  type = 0x23   id = 0x02
  type = 0x21   id = 0x03
  type = 0x23   id = 0x04
  type = 0x21   id = 0x05
  type = 0x30   id = 0x06
  type = 0x21   id = 0x07
  type = 0x21   id = 0x08
  type = 0x21   id = 0x09









- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
From zigate.fr
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  Clusters disponibles

  EndPoint: 0x03
  Profile ID: 0xC05E (ZigBee LL)
  Device ID: 0x0010 (Unknown)
  Input Cluster Count: 8
    Cluster 0x0000 (General: Basic)
    Cluster 0x0003 (General: Identify)
    Cluster 0x0004 (General: Groups)
    Cluster 0x0005 (General: Scenes)
    Cluster 0x0006 (General: On/Off)
    Cluster 0x1000 (ZLL: Commissioning)
    Cluster 0x0B04 (Unknown)
    Cluster 0xFC0F (Unknown)

  Output Cluster Count: 1
    Cluster 0: Cluster ID: 0x1000 (ZLL: Commissioning)

*/
