module.exports = {
	id: 0x8010,
	name: "simple_descriptor_response",
	parse: function(payload, rep) {
		rep.sequence = payload.readUInt8(0);
		rep.status = payload.readUInt8(1);
		rep.networkAddress = payload.readUInt16BE(2);
		rep.length = payload.readUInt8(4);
		rep.endpoint = payload.readUInt8(5);
		rep.profile = payload.readUInt16BE(6);
		rep.deviceId = payload.readUInt16BE(8);
		rep.inBitsField = payload.readUInt8(10);
		rep.in = [];
		var inCount = payload.readUInt8(11);
		for(let i=0; i<inCount; ++i) {
			rep.in.push(payload.readUInt16BE(12 + 2*i));
		}

		rep.out = [];
		var outCount = payload.readUInt8(12+2*inCount);
		var outStart = 12 + 2*inCount + 1;
		for(let i=0; i<outCount; ++i) {
			rep.out.push(payload.readUInt16BE(outStart + 2*i));
		}
		var outEnd = outStart + 2*outCount;
		rep.outBitsField = payload.readUInt8(outEnd);
		rep.deviceVersion = payload.readUInt8(outEnd+1) >> 4;
		rep.reserved = payload.readUInt8(outEnd+1) & 0x0F;
	},
};
