module.exports = {
	id: 0x0012,
	name: "erase_persistent_data",
	statusExpected: false,
	responseExpected: 'factory_restart',
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794
		

	build: function(options, cmd, version) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
