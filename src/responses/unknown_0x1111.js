module.exports = {
	id: 0x1111,
	name: "unknown_0x1111",
	parse: function(payload, rep) {
		console.error("unknown message 0x1111 received. Payload=("+payload.toString('hex').replace(/../g, "$& ")+")");
	},
};
