module.exports = {
	id: 0x0017,
	name: "time_server",
	statusExpected: true,
	responseExpected: 'time_server',

	build: function(options, cmd) {
		return cmd;
	},
};
