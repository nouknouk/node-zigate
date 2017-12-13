module.exports = {
	id: 0x004D,
	name: "device_announce",
	parse: function(reader, rep) {
		rep.address = reader.nextUInt16BE();
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.mac = reader.nextUInt8();
		rep.alternatePanCoordinator = !!(rep.mac & 0x1);
		rep.deviceType = !!(rep.mac & 0x2);
		rep.powerSource = !!(rep.mac & 0x4);
		rep.receiverOnWhenIdle = !!(rep.mac & 0x8);
		rep.reserved = !!(rep.mac & 0x48);
		rep.securityCapability = !!(rep.mac & 0x64);
		rep.allocateAddress = !!(rep.mac & 0x128);
	},
};

/*
[ZiDriver] response received: {"type":{"id":77,"name":"device_announce"},
	"shortAddress":20384,"ieeeAddress":"00158d0001e464b7",
	"mac":128,"alternatePanCoordinator":false,"deviceType":false,"powerSource":false,"receiverOnWhenIdle":false,"reserved":false,"securityCapability":false,"allocateAddress":false,
	"rssi":156}
[ZiDriver] Frame received ; raw data:  01 00 4d 00 0c 4c 4f a0 00 15 8d 00 01 e4 64 b7 80 cc
[ZiDriver] response received: {"type":{"id":77,"name":"device_announce"},
	"shortAddress":20384,"ieeeAddress":"00158d0001e464b7",
	"mac":128,"alternatePanCoordinator":false,"deviceType":false,"powerSource":false,"receiverOnWhenIdle":false,"reserved":false,"securityCapability":false,"allocateAddress":false,
	"rssi":204}
[ZiDriver] Frame received ; raw data:  01 81 02 00 23 bb 00 4f a0 01 00 00 00 05 00 42 00 16 6c 75 6d 69 2e 73 65 6e 73 6f 72 5f 6d 6f 74 69 6f 6e 2e 61 71 32 cc
[ZiDriver] response received: {"type":{"id":33026,"name":"attribute_report"},
	"srcSequence":0,"srcAddress":20384,
	"endpoint":1,"cluster":0,"attributeId":5,"attributeStatus":0,"attributeType":66,"attributeTypeName":"string","attributeSize":22,"value":"lumi.sensor_motion.aq2",
	"rssi":204}
[ZiDriver] Frame received ; raw data:  01 81 02 00 0e 8a 00 4f a0 01 00 00 00 01 00 20 00 01 05 cc
[ZiDriver] response received: {"type":{"id":33026,"name":"attribute_report"},
	"srcSequence":0,"srcAddress":20384,
	"endpoint":1,"cluster":0,"attributeId":1,"attributeStatus":0,"attributeType":32,"attributeTypeName":"uint8","attributeSize":1,"value":5,"rssi":204}
[ZiDriver] Frame received ; raw data:  01 87 01 00 03 4c 00 00 c9
[ZiDriver] response received: {"type":{"id":34561,"name":"router_discovery_confirm"},
	"status":0,"networkStatus":0,"rssi":201}
[ZiDriver] Frame received ; raw data:  01 81 02 00 0f 9f 02 4f a0 01 04 00 00 00 00 21 00 02 00 0a d2
[ZiDriver] response received: {"type":{"id":33026,"name":"attribute_report"},
	"srcSequence":2,"srcAddress":20384,
	"endpoint":1,"cluster":1024,"attributeId":0,"attributeStatus":0,"attributeType":33,"attributeTypeName":"uint16","attributeSize":2,"value":10,"rssi":210}
[ZiDriver] Frame received ; raw data:  01 81 02 00 0e a8 03 4f a0 01 04 06 00 00 00 18 00 01 01 d2
[ZiDriver] response received: {"type":{"id":33026,"name":"attribute_report"},
	"srcSequence":3,"srcAddress":20384,
	"endpoint":1,"cluster":1030,"attributeId":0,"attributeStatus":0,"attributeType":24,"attributeTypeName":"bitmap8","attributeSize":1,"value":1,"rssi":210}
*/
