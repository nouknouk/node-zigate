module.exports = {
	id: 0x0010,
	name: "get_version",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
