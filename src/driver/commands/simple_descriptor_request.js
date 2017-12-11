module.exports = {
	id: 0x0043,
	name: "simple_descriptor_request",
	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		if (isNaN(parseInt(options.endpoint))) throw new Error("invalid mandatory parameter 'endpoint'.");

		cmd.payload = Buffer.alloc(3);
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		cmd.payload.writeUInt8(parseInt(options.endpoint), 2);
		return cmd;
	},
};
