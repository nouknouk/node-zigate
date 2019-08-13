const Enum = require('../enum.js');

// (escaped) frame exemple:
//     [0x01, 0x81, 0x02, 0x12, 0x02, 0x10, 0x19, 0x7F, 0x02, 0x10, 0xE1, 0xE1, 0x02, 
//      0x11, 0x02, 0x10, 0x02, 0x10, 0x02, 0x10, 0x02, 0x15, 0x02, 0x10, 0x42, 0x02, 
//      0x10, 0x02, 0x1C, 0x6C, 0x75, 0x6D, 0x69, 0x2E, 0x77, 0x65, 0x61, 0x74, 0x68, 
//      0x65, 0x72, 0xE4, 0x03]

// parsed response example:
//     descriptor_node(0x8042), sequence:115, address:0x3d, manufacturer:44304, 
//     maxRxSize:14080, maxTxSize:25600, serverFlags:[object Object], 
//     alternatePanCoordinator:false, deviceType:false, powerSource:false, 
//     receiverOnWhenIdle:false, securityCapability:false, allocateAddress:false, 
//     maxBufferSize:128, nodeType:undefined, 
//     complexDescriptorAvailable:true, userDescriptorAvailable:true, 
//     reserved:7, apsFlags:2, frequencyBand:0, rssi:108

module.exports = {
	id: 0x8042,
	name: "descriptor_node",
	parse: function(reader, rep, version) {
		rep.sequence = reader.nextUInt8();
		rep.address = reader.nextUInt16BE();
		rep.manufacturer = reader.nextUInt16BE();
		rep.maxRxSize = reader.nextUInt16BE();
		rep.maxTxSize = reader.nextUInt16BE();

		var serverMask = reader.nextUInt16BE();
		rep.serverFlags = {
			primaryTrustCenter:    !!((serverMask >> 15) & 0x1),
			backupTrustCenter:     !!((serverMask >> 14) & 0x1),
			primaryBindingCache:   !!((serverMask >> 13) & 0x1),
			backupBindingCache:    !!((serverMask >> 12) & 0x1),
			primaryDiscoveryCache: !!((serverMask >> 11) & 0x1),
			backupDiscoveryCache:  !!((serverMask >> 10) & 0x1),
			networkManager:        !!((serverMask >>  9) & 0x1),
		};

		var descriptorCapability = reader.nextUInt8();

		var macFlags = reader.nextUInt8();
		rep.alternatePanCoordinator = !!((macFlags >> 7) & 0x1);   // is node able to act as co-ordinator 
		rep.fullFunctionDevice =      !!((macFlags >> 6) & 0x1);   // true = full function device ; false = reduced
		rep.ACpowerCource =           !!((macFlags >> 5) & 0x1);   // true = AC powered ; false = battery
		rep.receiverOnWhenIdle =      !!((macFlags >> 4) & 0x1);   
		rep.highsecurityCapability =  !!((macFlags >> 1) & 0x1);   // true = high security
		rep.allocateAddress =         !!( macFlags       & 0x1);   // should address be allocated to node

		rep.maxBufferSize = reader.nextUInt8();

		var bitFields = reader.nextUInt16BE();
		rep.nodeType = Enum.NODE_LOGICAL_TYPE(bitFields >> 13);
		rep.complexDescriptorAvailable = !!( (bitFields>>12) & 0x1);
		rep.userDescriptorAvailable = !!( (bitFields>>11) & 0x1);
		rep.reserved = (bitFields>>8) & 0x7;
		rep.apsFlags = (bitFields>>5) & 0x7;
		rep.frequencyBand = bitFields & 0x7;



	},
};
