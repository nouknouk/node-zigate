module.exports = {
	id: 0x0026,
	name: "device_remove",
	statusExpected: true,
	responseExpected: 'device_remove',
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	
	build: function(options, cmd, version) {
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.extended = (typeof(options.extended) === 'string' && options.extended.length === 16) ? options.extended : (()=>{throw new Error("invalid parameter 'extended'."); })();

		cmd.payload = Buffer.alloc(10);

		cmd.payload.writeUInt16BE(cmd.address, 0)
		Buffer.from(cmd.extended, 'hex').copy(cmd.payload, 2);

		return cmd;
	},
};
