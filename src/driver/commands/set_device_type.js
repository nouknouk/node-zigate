DEVICE_TYPES = [
	{id: 0, name: 'coordinator'},
	{id: 1, name: 'router'},
	{id: 2, name: 'legacy_router'},
];

module.exports = {
	id: 0x0023,
	name: "set_device_type",
	build: function(options, cmd) {
		if (typeof(options.type) === 'string') {
			cmd.type = DEVICE_TYPES.find((t) => { return t.name === options.type.toLowerCase(); }).id || 0;
		}
		else if (typeof(options.type) === 'number') {
			cmd.type = DEVICE_TYPES.find((t) => { return t.id === options.type; }).id || 0;
		}
		else cmd.type = 0/*coordinator*/;

		cmd.payload = Buffer.alloc(1);
		cmd.payload.writeUInt8(cmd.type)
		return cmd;
	},
};
