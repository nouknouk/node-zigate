const Enum = require('../enum.js');

module.exports = {
	id: 0x0017,
	name: "time_get",
	statusExpected: true,
	responseExpected: 'time_get',
	minVersion: 783, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
