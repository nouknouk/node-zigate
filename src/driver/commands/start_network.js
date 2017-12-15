module.exports = {
	id: 0x0024,
	name: 'start_network',
	statusExpected: true,
	responseExpected: 'network_joined',	
	
	
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
