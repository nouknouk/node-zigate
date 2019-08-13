const Enum = require('../enum.js');

module.exports = {
	id: 0x0019,
	name: "certification",
	statusExpected: true,
	responseExpected: false,
	minVersion: 783, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794


	build: function(options, cmd, version) {

		cmd.certification = Enum.CERTIFICATION(options.certification, new Error("unknown certification '"+options.certification+"'"));

		cmd.payload = Buffer.alloc(1);
		cmd.payload.writeUInt8(cmd.certification.id)
		return cmd;
	},
};
