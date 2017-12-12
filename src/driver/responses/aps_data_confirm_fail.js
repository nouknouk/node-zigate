module.exports = {
	id: 0x8702,
	name: "data_indication",
	parse: function(reader, rep) {
		rep.status = reader.nextUInt8();
		rep.srcEndpoint = reader.nextUInt8();
		rep.dstEndpoint = reader.nextUInt8();
		rep.dstAddressMode = reader.nextUInt8();
		rep.dstAddress = reader.nextBuffer(8).toString('hex');
		rep.seqNumber = reader.nextUInt8();
	},
};
