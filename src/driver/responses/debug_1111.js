module.exports = {
	id: 0x1111,
	name: "debug_1111",
	parse: function(reader, rep, version) {
		// console.error("debug message 0x1111 received. Payload=("+payload.toString('hex').replace(/../g, "$& ")+")");
		rep.data = reader.restAll();
	},
};
