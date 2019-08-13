const Enum = require('../enum.js');
const TIME_BASE = new Date('2000-01-01 00:00:00Z').getTime();

module.exports = {
	id: 0x8017,
	name: "time_get",
	parse: function(reader, rep, version) {
		rep.timestamp = reader.nextUInt32();
		rep.time = new Date(TIME_BASE + rep.timestamp*1000);

	},
};
