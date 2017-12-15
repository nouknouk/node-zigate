const Enum = require('../enum.js');

module.exports = {
	id: 0x8014,
	name: "permit_join_status",
	parse: function(reader, rep) {
		rep.status = Enum.PERMIT_JOIN_STATUS(reader.nextUInt8());
		rep.enabled = rep.status.id ? true : false;
	},
};
