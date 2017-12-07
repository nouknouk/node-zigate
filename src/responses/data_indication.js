module.exports = {
	id: 0x8001,
	name: "data_indication",
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.profileId = payload.readUInt16BE(1);
		rep.clusterId = payload.readUInt16BE(3);
		rep.srcEndpoint = payload.readUInt8(5);
		rep.destEndpoint = payload.readUInt8(6);
		rep.srcAddressMode = payload.readUInt8(7);
		var i=8;
		rep.srcAddress = rep.srcAddressMode ? payload.slice(8,8).toString('hex') : payload.readUInt16BE(8);
		i+= rep.srcAddressMode ? 8 : 2;
		rep.dstAddressMode = payload.readUInt8(i++);
		var payloadSize = payload.readUInt8(i++);
		rep.data = payload.slice(i,payloadSize);
	},
};
