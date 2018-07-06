const Enum = require('../enum.js');

module.exports = {
	id: 0x0140,
	name: "attribute_discovery",

	
	build: function(options, cmd) {
		cmd.addressMode = Enum.ADDRESS_MODE(options.addressMode, Enum.ADDRESS_MODE('short'));
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = options.endpoint || (()=>{throw new Error("invalid parameter 'endpoint'.")})();
		cmd.endpointSource = options.endpointSource || 0x01; // the zigbee key's endpoint itself ?
		cmd.cluster = Enum.CLUSTERS(options.cluster, {id: options.cluster, name:'unknown_0x'+options.cluster.toString(16) });
		cmd.firstId = options.firstId || 0x0000;
		cmd.direction = Enum.DIRECTION(options.direction, Enum.DIRECTION('srv_to_cli'));
		cmd.manufacturer = cmd.manufacturer || false;
		cmd.count = options.count || 0x5;

		cmd.payload = Buffer.alloc(14);

		cmd.payload.writeUInt8(cmd.addressMode.id, 0); // short address mode
		cmd.payload.writeUInt16BE(cmd.address, 1);
		cmd.payload.writeUInt8(cmd.endpointSource, 3);
		cmd.payload.writeUInt8(cmd.endpoint, 4);
		cmd.payload.writeUInt16BE(cmd.cluster.id, 5);
		cmd.payload.writeUInt16BE(cmd.firstId, 7);
		cmd.payload.writeUInt8(cmd.direction.id, 9);
		cmd.payload.writeUInt8((cmd.manufacturer ? 1 : 0), 10); /* manufacturer specific */
		cmd.payload.writeUInt16BE((cmd.manufacturer || 0), 11);
		cmd.payload.writeUInt8(cmd.count, 13);

		return cmd;
	},
};
