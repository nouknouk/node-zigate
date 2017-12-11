module.exports = {
	id: 0x0026,
	name: "remove_device",

	build: function(options, cmd) {
		if (typeof(options.shortAddress) !== 'string' || options.shortAddress.length !== 16) throw new Error("invalid mandatory parameter 'shortAddress'.");
		if (typeof(options.extendedAddress) !== 'string' || options.extendedAddress.length !== 16) throw new Error("invalid mandatory parameter 'extendedAddress'.");

		cmd.payload = Buffer.alloc(16);
		Buffer.from(options.shortAddress, 'hex').copy(cmd.payload, 0);
		Buffer.from(options.extendedAddress, 'hex').copy(cmd.payload, 8);
		return cmd;
	},
};
