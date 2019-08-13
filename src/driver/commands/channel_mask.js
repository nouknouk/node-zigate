module.exports = {
	id: 0x0021,
	name: "channel_mask",
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794
	

	build: function(options, cmd, version) {
		cmd.mask = options.mask || 11;

		cmd.payload = Buffer.alloc(4);

		cmd.payload.writeUInt32BE(cmd.mask)

		return cmd;
	},
};
