module.exports = {
	id: 0x0011,
	name: "reset",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
