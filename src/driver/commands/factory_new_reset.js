module.exports = {
	id: 0x0013,
	name: "factory_new_reset",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
