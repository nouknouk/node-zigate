module.exports = {
	id: 0x0016,
	name: "time_server_set",
	statusExpected: true,

	build: function(options, cmd) {
		if (isNaN(new Date(options.time))) {
			cmd.time = new Date();
		}
		cmd.timestamp = cmd.time - (((new Date("2000-01-01T00:00:00.000Z")).getTime())/1000)
		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt32BE(parseInt(cmd.time), 0);
		return cmd;
	},
};
