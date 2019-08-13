const Enum = require('../enum.js');

module.exports = {
	id: 0x8048,
	name: "device_remove",
	parse: function(reader, rep, version) {
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.rejoin = !!(reader.nextUInt8());
	},
};
