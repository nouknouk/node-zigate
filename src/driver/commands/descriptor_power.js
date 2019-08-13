module.exports = {
	id: 0x0044,
	name: "descriptor_power",
	statusExpected: true,
	responseExpected: 'descriptor_power',
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();

		cmd.payload = Buffer.alloc(2);
		cmd.payload.writeUInt16BE(parseInt(cmd.address), 0);
		return cmd;
	},
};
