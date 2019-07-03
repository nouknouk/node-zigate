module.exports = {
	id: 0x8017,
	name: "time_server",
	parse: function(reader, rep) {
		rep.timestamp = reader.nextUInt32BE();
		rep.time = new Date(rep.timestamp *1000 + (new Date("2000-01-01T00:00:00.000Z")).getTime());
	},
};
