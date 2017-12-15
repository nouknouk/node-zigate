module.exports = {
	id: 0x0025,
	name: "start_network_scan",
	statusExpected: true,
	responseExpected: false,
	
	
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
