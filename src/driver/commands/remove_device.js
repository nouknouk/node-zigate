module.exports = {
	id: 0x0026,
	name: "remove_device",

	build: function(options, cmd) {
		if (isNaN(parseInt(options.shortAddress))) throw new Error("invalid mandatory parameter 'shortAddress'.");
		if (typeof(options.extendedAddress) !== 'string' || options.extendedAddress.length !== 16) throw new Error("invalid mandatory parameter 'extendedAddress'.");

		cmd.payload = Buffer.alloc(10);
		cmd.payload.writeUInt18BE(options.shortAddress, 0)
		Buffer.from(options.extendedAddress, 'hex').copy(cmd.payload, 2);
		return cmd;
	},
};
