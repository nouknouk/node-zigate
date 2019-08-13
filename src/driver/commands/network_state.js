module.exports = {
	id: 0x0009,
	name: 'network_state',
	statusExpected: true,
	responseExpected: 'network_state',
	minVersion: 781, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
