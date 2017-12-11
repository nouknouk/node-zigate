module.exports = {
	id: 0x8043,
	name: "simple_descriptor_response",
	parse: function(reader, rep) {
		rep.srcSequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		rep.srcAddress = reader.nextUInt16BE();
		rep.length = reader.nextUInt8();   // ???
		rep.endpoint = reader.nextUInt8();
		rep.profileId = reader.nextUInt16BE();
		rep.deviceId = reader.nextUInt16BE();
		
		var bitsField = reader.nextUInt8();
		rep.deviceVersion = bitsField & 0xF0; // bits 0-4
		rep.reserved = bitsField & 0x0F; // bits 4-7
		
		rep.inClusters = [];
		var inCount = reader.nextUInt8(11);
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
