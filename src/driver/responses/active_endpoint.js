const Enum = require('../constants.js');

module.exports = {
	id: 0x8045,
	name: "active_endpoint",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8(), new Error("active_endpoint: unknown status"));
		rep.address = reader.nextUInt16BE();

		rep.endpoints = [];
		var count = reader.nextUInt8();
		for (var i=0; i<count; ++i) {
			rep.endpoints.push(reader.nextUInt8());
		}
	},
};
