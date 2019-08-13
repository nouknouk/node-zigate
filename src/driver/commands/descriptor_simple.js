module.exports = {
	id: 0x0043,
	name: "descriptor_simple",
	statusExpected: true,
	responseExpected: 'descriptor_simple',
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794


	build: function(options, cmd, version) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = !(isNaN(parseInt(options.endpoint))) ? options.endpoint : (()=>{throw new Error("invalid parameter 'endpoint'.");})();

		cmd.payload = Buffer.alloc(3);
		cmd.payload.writeUInt16BE(parseInt(cmd.address), 0);
		cmd.payload.writeUInt8(parseInt(cmd.endpoint), 2);
		return cmd;
	},
};
