const Enum = require('../constants.js');

module.exports = {
	id: 0x8048,
	name: "leave_indication",
	parse: function(reader, rep) {
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.rejoin = !!(reader.nextUInt8());
	},
};
