module.exports = {
	id: 0x0034,
	name: "descriptor_complex",
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.interest = !(isNaN(parseInt(options.interest))) ? options.interest : (()=>{throw new Error("invalid parameter 'interest'.");})();

		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt16BE(parseInt(cmd.address), 0);
		cmd.payload.writeUInt16BE(parseInt(cmd.interest), 0);
		return cmd;
	},
};
