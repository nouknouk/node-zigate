module.exports = {
	id: 0x0049,
	name: "permit_join",
	statusExpected: true,
	responseExpected: false,
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794
	

	build: function(options, cmd, version) {
		cmd.address = options.address || 0xFFFC /*broadcast*/;
		cmd.duration = options.duration===0 ? 0 : (parseInt(options.duration) || 254);
		cmd.significance = parseInt(options.significance) || 0; /* 0 = No change in authentication ; 1 = Authentication policy as spec */

		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt16BE(cmd.address, 0);
		cmd.payload.writeUInt8(cmd.duration, 2);
		cmd.payload.writeUInt8(cmd.significance, 3);
		return cmd;
	},
};
