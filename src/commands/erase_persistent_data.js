module.exports = {
	id: 0x0012,
	name: "erase_persistent_data",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
