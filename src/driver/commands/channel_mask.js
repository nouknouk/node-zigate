module.exports = {
	id: 0x0021,
	name: "channel_mask",
	build: function(options, cmd) {
		cmd.mask = options.mask || 11;
		
		cmd.payload = Buffer.alloc(4);
		
		cmd.payload.writeUInt32BE(cmd.mask)
		
		return cmd;
	},
};
