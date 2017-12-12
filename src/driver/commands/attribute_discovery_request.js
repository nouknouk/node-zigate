module.exports = {
	id: 0x0140,
	name: "attribute_discovery_request",

	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		if (isNaN(parseInt(options.srcEndpoint))) throw new Error("invalid mandatory parameter 'srcEndpoint'.");
		if (isNaN(parseInt(options.dstEndpoint))) throw new Error("invalid mandatory parameter 'dstEndpoint'.");
		if (isNaN(parseInt(options.cluster))) throw new Error("invalid mandatory parameter 'cluster'.");
		if (isNaN(parseInt(options.attribute))) throw new Error("invalid mandatory parameter 'attribute'.");
		if (options.serverToClient) options.clientToServer = false;
		if (typeof(options.clientToServer) === 'undefined') throw new Error("invalid mandatory parameter 'serverToClient' / 'clientToServer'.");
		if (typeof(options.manufacturerSpecific) === 'undefined') throw new Error("invalid mandatory parameter 'manufacturerSpecific'.");
		if (options.manufacturerSpecific && isNaN(parseInt(options.manufacturer))) throw new Error("invalid mandatory parameter 'manufacturerSpecific'.");
		if (isNaN(parseInt(options.maxCount))) throw new Error("invalid mandatory parameter 'maxCount'.");


		cmd.payload = Buffer.alloc(14);
		cmd.payload.writeUInt8(2, 0); // short address mode
		cmd.payload.writeUInt16BE(options.target, 1);
		cmd.payload.writeUInt8(options.srcEndpoint, 3);
		cmd.payload.writeUInt8(options.dstEndpoint, 4);
		cmd.payload.writeUInt16BE(options.cluster, 5);
		cmd.payload.writeUInt16BE(options.attribute, 7);
		cmd.payload.writeUInt8((options.clientToServer ? 1 : 0), 9);
		cmd.payload.writeUInt8((options.manufacturerSpecific ? 1 : 0), 10);
		cmd.payload.writeUInt16BE(options.manufacturer || 0, 11);
		cmd.payload.writeUInt8(options.maxCount || 0, 13);

		return cmd;
	},
};
