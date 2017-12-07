module.exports = {
	id: 0x0043,
	name: "simple_descriptor_request",
	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");

		cmd.payload = Buffer.alloc(2);
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		return cmd;
	},
};
