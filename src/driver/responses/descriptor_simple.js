module.exports = {
	id: 0x8043,
	name: "descriptor_simple",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		rep.address = reader.nextUInt16BE();
		rep.length = reader.nextUInt8();   // ???
		rep.endpoint = reader.nextUInt8();
		rep.profile = Enum.PROFILES(reader.nextUInt16BE());

		var haType = reader.nextUInt16BE();
		rep.deviceType = Enum.DEVICE_HA_TYPE(haType, { id:haType, name:'unknown_0x'+haType.toString(16) });;

		var bitsField = reader.nextUInt8();
		rep.deviceVersion = bitsField & 0x0F; // bits 0-4
		rep.reserved = bitsField >> 4; // bits 4-7

		rep.inClusters = [];
		var inCount = reader.nextUInt8();
		for(let i=0; i<inCount; ++i) {
			rep.inClusters.push(reader.nextUInt16BE());
		}

		rep.outClusters = [];
		var outCount = reader.nextUInt8();
		for(let i=0; i<outCount; ++i) {
			rep.outClusters.push(reader.nextUInt16BE());
		}
	},
};
