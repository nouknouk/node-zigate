module.exports = {
	id: 0x0009,
	name: 'network_state',
	statusExpected: true,
	responseExpected: 'network_state',

	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
