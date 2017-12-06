module.exports = {
	typeid: 0x8010,
	typename: "active_endpoint_response",
	parse: function(payload) {
		var rep = {
			type: this.typeid,
		};
		rep.sequence = payload.readUInt8(0);
		rep.status = payload.readUInt8(1);
		rep.address = payload.readUInt16BE(2);
		rep.endpoints = [];
		var count = payload.readUInt8(4);
		for (var i=0; i<count; ++i) {
			rep.endpoints.push(payload.readUInt8(5+i));
		}
		return rep;
	},
};
