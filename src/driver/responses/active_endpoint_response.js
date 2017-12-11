module.exports = {
	id: 0x8045,
	name: "active_endpoint_response",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		rep.srcAddress = reader.nextUInt16BE();
		rep.endpoints = [];
		var count = reader.nextUInt8();
		for (var i=0; i<count; ++i) {
			rep.endpoints.push(reader.nextUInt8());
		}
	},
};
