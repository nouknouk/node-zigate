module.exports = {
	id: 0x0049,
	name: "permit_join_request",
	build: function(options, cmd) {
		options.target = options.target || 0xFFFC /*broadcast*/;
		options.duration = options.duration===0 ? 0 : (options.duration || 254);
		options.significance = options.significance || 0; /* 0 = No change in authentication ; 1 = Authentication policy as spec */

		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		cmd.payload.writeUInt8(parseInt(options.duration), 2);
		cmd.payload.writeUInt8(parseInt(options.significance), 3);
		return cmd;
	},
};
