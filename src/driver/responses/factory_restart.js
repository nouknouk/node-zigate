const Enum = require('../constants.js');

module.exports = {
	id: 0x8007,
	name: "factory_restart",
	parse: function(reader, rep) {
		rep.status = Enum.RESTART_STATUS(reader.nextUInt8());
	},
};
