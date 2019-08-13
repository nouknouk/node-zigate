const Enum = require('../enum.js');

module.exports = {
	id: 0x0100,
	name: "attribute_read",
	minVersion: 0, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		cmd.addressMode = Enum.ADDRESS_MODE(options.addressMode, Enum.ADDRESS_MODE('short'));
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = !(isNaN(parseInt(options.endpoint))) ? parseInt(options.endpoint) : (()=>{throw new Error("invalid parameter 'endpoint'.")})();
		cmd.endpointSource = !(isNaN(parseInt(options.endpointSource))) ? options.endpointSource : 0x01; // the zigbee key's endpoint itself ?
		cmd.cluster = Enum.CLUSTERS(options.cluster, new Error("invalid parameter 'cluster'."));
		cmd.direction = Enum.DIRECTION(options.direction, Enum.DIRECTION('srv_to_cli'));
		cmd.manufacturer = cmd.manufacturer || false;
		cmd.attributes = options.attributes || (()=>{throw new Error("invalid parameter 'attributes'.");})();

		cmd.payload = Buffer.alloc(12+2*cmd.attributes.length);

		cmd.payload.writeUInt8(cmd.addressMode.id, 0); // short address mode
		cmd.payload.writeUInt16BE(cmd.address, 1);
		cmd.payload.writeUInt8(cmd.endpointSource, 3);
		cmd.payload.writeUInt8(cmd.endpoint, 4);
		cmd.payload.writeUInt16BE(cmd.cluster.id, 5);
		cmd.payload.writeUInt8(cmd.direction.id, 7);
		cmd.payload.writeUInt8( (cmd.manufacturer ? 1 : 0), 8); /* manufacturer specific */
		cmd.payload.writeUInt16BE( (cmd.manufacturer || 0), 9);

		cmd.payload.writeUInt8(cmd.attributes.length || 0, 11);
		for (let i=0; i<cmd.attributes.length; ++i) {
			cmd.payload.writeUInt16BE(cmd.attributes[i], 12+i*2);
		}

		return cmd;
	},
};
