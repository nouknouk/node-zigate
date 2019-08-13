const Enum = require('../enum.js');

module.exports = {
	id: 0x8101,
	name: "default_response",
	parse: function(reader, rep, version) {
		rep.sequence = reader.nextUInt8();
		rep.endpoint = reader.nextUInt8();
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE(), new Error("default_response: unknown cluster"));
		rep.command = reader.nextUInt8();
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8());
	},
};
