module.exports = {
	id: 0x0043,
	name: "descriptor_simple",
	statusExpected: true,
	responseExpected: 'descriptor_simple',

	
	build: function(options, cmd) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = !(isNaN(parseInt(options.endpoint))) ? options.endpoint : (()=>{throw new Error("invalid parameter 'endpoint'.");})();
		
		cmd.payload = Buffer.alloc(3);
		cmd.payload.writeUInt16BE(parseInt(cmd.address), 0);
		cmd.payload.writeUInt8(parseInt(cmd.endpoint), 2);
		return cmd;
	},
};
