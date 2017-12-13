const Enum = require('../constants.js');

module.exports = {
	id: 0x8101,
	name: "default_response",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.endpoint = reader.nextUInt8();
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
		rep.id = reader.nextUInt8();
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8());
	},
};
