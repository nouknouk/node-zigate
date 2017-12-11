module.exports = {
	id: 0x0045,
	name: "active_endpoint_request",

	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");

		cmd.payload = Buffer.alloc(3);
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		return cmd;
	},
};
