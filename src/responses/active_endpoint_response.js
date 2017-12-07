module.exports = {
	id: 0x8010,
	name: "active_endpoint_response",
	parse: function(payload, rep) {
		rep.sequence = payload.readUInt8(0);
		rep.status = payload.readUInt8(1);
		rep.address = payload.readUInt16BE(2);
		rep.endpoints = [];
		var count = payload.readUInt8(4);
		for (var i=0; i<count; ++i) {
			rep.endpoints.push(payload.readUInt8(5+i));
		}
	},
};
