module.exports = {
	id: 0x8002,
	name: "data_indication",
	parse: function(reader, rep) {
		rep.status = reader.nextUInt8();
		rep.profileId = reader.nextUInt16BE();
		rep.clusterId = reader.nextUInt16BE();
		rep.srcEndpoint = reader.nextUInt8();
		rep.destEndpoint = reader.nextUInt8();
		
		rep.srcAddressMode = reader.nextUInt8();
		rep.srcAddress = rep.srcAddressMode ? reader.nextBuffer(8).toString('hex') : reader.nextUInt16BE();

		rep.dstAddressMode = reader.nextUInt8();
		rep.dstAddress = rep.dstAddressMode ? reader.nextBuffer(8).toString('hex') : reader.nextUInt16BE();
		var dataSize = reader.nextUInt8();
		
		rep.data = [];
		for (var i=0; i<dataSize; ++i) {
			rep.data.push(reader.nextUInt8())
		}
	},
};
