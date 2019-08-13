module.exports = {
	id: 0x0041,
	name: "ieee_address",
	statusExpected: true,
	responseExpected: 'ieee_address',
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794
	
	build: function(options, cmd, version) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.extended = !!(options.extended);
		cmd.start = options.start || 0;
		cmd.devices = options.start || 0;
		cmd.target = options.target || 0;

		cmd.payload = Buffer.alloc(6);
		cmd.payload.writeUInt16BE(cmd.target, 0);
		cmd.payload.writeUInt16BE(cmd.address, 2);
		cmd.payload.writeUInt8(cmd.extended, 4);    // Request Type: 0 = Single 	; 1 = Extended
		cmd.payload.writeUInt8(cmd.start, 5);
		return cmd;
	},
};
