module.exports = {
	id: 0x0012,
	name: "erase_persistent_data",
	statusExpected: false,
	responseExpected: 'factory_restart',
		
		
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
