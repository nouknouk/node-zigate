module.exports = {
	id: 0x0018,
	name: "led_set",
	statusExpected: true,

	build: function(options, cmd) {
		if (typeof(options.led) === 'undefined') throw new Error('missing led parameter');
		cmd.led = !!options.led;
		cmd.payload = Buffer.alloc(1);
		cmd.payload.writeUInt8(cmd.led ? 1 : 0);
		return cmd;
	},
};
