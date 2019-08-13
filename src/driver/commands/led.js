const Enum = require('../enum.js');

module.exports = {
	id: 0x0018,
	name: "led",
	statusExpected: true,
	responseExpected: false,
	minVersion: 783, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794


	build: function(options, cmd, version) {
		cmd.payload = Buffer.alloc(1);
		cmd.payload.writeUInt8(cmd.led ? 0 : 1)
		return cmd;
	},
};
