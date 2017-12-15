const Enum = require('../enum.js');

module.exports = {
	id: 0x8001,
	name: "log_message",
	parse: function(reader, rep) {
		rep.level = Enum.LOG_LEVEL(reader.nextUInt8());
		rep.message = reader.restAll().toString();
	},
};
