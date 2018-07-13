module.exports = {
	id: 0x0093,
	name: "action_onoff_timed",
  statusExpected: true,
  responseExpected: 'default_response',

	build: function(options, cmd) {
		cmd.addressMode = Enum.ADDRESS_MODE(options.addressMode, Enum.ADDRESS_MODE('short'));
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = options.endpoint || (()=>{throw new Error("invalid parameter 'dstEndpoint'.")})();
		cmd.endpointSource = options.endpointSource || 0x01; // the zigbee key's endpoint itself ?
		cmd.on = (!!options.on) || options.off === false;
    cmd.off = (!!options.off) || options.on === false;
		cmd.ontime = (!!options.on) || 0;
		cmd.offtime = (!!options.on) || 0;

		cmd.payload = Buffer.alloc(6);

		cmd.payload.writeUInt8(cmd.addressMode.id, 0); // short address mode
		cmd.payload.writeUInt16BE(cmd.address, 1);
		cmd.payload.writeUInt8(cmd.endpointSource, 3);
		cmd.payload.writeUInt8(cmd.endpoint, 4);

    if (command.on) {
      cmd.payload.writeUInt8(1, 5);
      cmd.payload.writeUint8(cmd.ontime, 6);
      cmd.payload.writeUint8(cmd.offtime, 8);
    }
    if (command.off) {
      cmd.payload.writeUInt8(0, 5);
      cmd.payload.writeUint8(cmd.ontime, 6);
      cmd.payload.writeUint8(cmd.offtime, 8);
    }

		return cmd;
	},
};
