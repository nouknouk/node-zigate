module.exports = {
	id: 0x2222,
	name: "debug_2222",
	parse: function(reader, rep, version) {
		// console.error("debug message 0x2222 received. Payload=("+payload.toString('hex').replace(/../g, "$& ")+")");
		rep.data = reader.restAll();
		
	},
};
