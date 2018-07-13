module.exports = {
	id: 0x0092,
	name: "action_onoff",
  statusExpected: true,
  responseExpected: 'default_response',

	build: function(options, cmd) {
		cmd.addressMode = Enum.ADDRESS_MODE(options.addressMode, Enum.ADDRESS_MODE('short'));
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = options.endpoint || (()=>{throw new Error("invalid parameter 'dstEndpoint'.")})();
		cmd.endpointSource = options.endpointSource || 0x01; // the zigbee key's endpoint itself ?
		cmd.on = (!!options.on) || options.off === false;
    cmd.off = (!!options.off) || options.on === false;
    cmd.toggle = (!!options.toggle);

		cmd.payload = Buffer.alloc(6);

		cmd.payload.writeUInt8(cmd.addressMode.id, 0); // short address mode
		cmd.payload.writeUInt16BE(cmd.address, 1);
		cmd.payload.writeUInt8(cmd.endpointSource, 3);
		cmd.payload.writeUInt8(cmd.endpoint, 4);

    if (cmd.on) cmd.payload.writeUInt8(1, 5);
    else if (cmd.off) cmd.payload.writeUInt8(0, 5);
    else if (cmd.on) cmd.payload.writeUInt8(2, 5);

		return cmd;
	},
};
