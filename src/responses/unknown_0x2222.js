module.exports = {
	id: 0x2222,
	name: "unknown_0x2222",
	parse: function(payload, rep) {
		console.error("unknown message 0x2222 received. Payload=("+payload.toString('hex').replace(/../g, "$& ")+")");
	},
};
