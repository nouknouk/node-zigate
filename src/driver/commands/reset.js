module.exports = {
	id: 0x0011,
	name: "reset",
	statusExpected: false, // bug in frame_end just after reset ; status frame is discarded */
	responseExpected: 'non_factory_restart',
	
	
	build: function(options, cmd) {
		cmd.payload = Buffer.alloc(0);
		return cmd;
	},
};
