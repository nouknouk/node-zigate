const Enum = require('../enum.js');

module.exports = {
	id: 0x0023,
	name: "device_type",
	statusExpected: true,
	responseExpected: false,	
	
	
	build: function(options, cmd) {
		cmd.type = Enum.DEVICE_TYPE(options.type, new Error("unknown device type '"+options.type+"'"));
		
		cmd.payload = Buffer.alloc(1);
		
		cmd.payload.writeUInt8(cmd.type)
		return cmd;
	},
};
