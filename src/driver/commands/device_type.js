const Enum = require('../enum.js');

module.exports = {
	id: 0x0023,
	name: "device_type",
	statusExpected: true,
	responseExpected: false,
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794


	build: function(options, cmd, version) {
		cmd.type = Enum.DEVICE_TYPE(options.type, new Error("unknown device type '"+options.type+"'"));

		cmd.payload = Buffer.alloc(1);

		cmd.payload.writeUInt8(cmd.type.id)
		return cmd;
	},
};
