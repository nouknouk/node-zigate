module.exports = {
	id: 0x0019,
	name: "certification_set",
	statusExpected: true,

	build: function(options, cmd) {
		cmd.certification = Enum.CERTIFICATION(options.certification, new Error("unknown certification type '"+options.certification+"'"));

		cmd.payload = Buffer.alloc(1);

		cmd.payload.writeUInt8BE(cmd.certification)

		return cmd;
	},
};
