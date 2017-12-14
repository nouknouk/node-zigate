module.exports = {
	id: 0x0014,
	name: "permit_join_status",
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
