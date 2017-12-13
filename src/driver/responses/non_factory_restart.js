const Enum = require('../constants.js');

module.exports = {
	id: 0x8006,
	name: "non_factory_restart",
	parse: function(reader, rep) {
		rep.status = Enum.RESTART_STATUS(reader.nextUInt8(0));
	},
};
