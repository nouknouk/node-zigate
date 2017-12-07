module.exports = {
	id: 0x0024,
	name: "start_network",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
