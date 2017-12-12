module.exports = {
	id: 0x0100,
	name: "read_attribute_request",

	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		if (isNaN(parseInt(options.srcEndpoint))) throw new Error("invalid mandatory parameter 'srcEndpoint'.");
		if (isNaN(parseInt(options.dstEndpoint))) throw new Error("invalid mandatory parameter 'dstEndpoint'.");
		if (isNaN(parseInt(options.cluster))) throw new Error("invalid mandatory parameter 'cluster'.");
		if (options.serverToClient) options.clientToServer = false;
		if (typeof(options.clientToServer) === 'undefined') throw new Error("invalid mandatory parameter 'serverToClient' / 'clientToServer'.");
		if (typeof(options.manufacturerSpecific) === 'undefined') throw new Error("invalid mandatory parameter 'manufacturerSpecific'.");
		if (options.manufacturerSpecific && isNaN(parseInt(options.manufacturer))) throw new Error("invalid mandatory parameter 'manufacturerSpecific'.");

		if (!options.attributes) throw new Error("invalid mandatory parameter 'attributes'.");

		cmd.payload = Buffer.alloc(12+2*options.attributes.length);
		cmd.payload.writeUInt8(2, 0); // short address mode
		cmd.payload.writeUInt16BE(options.target, 1);
		cmd.payload.writeUInt8(options.srcEndpoint, 3);
		cmd.payload.writeUInt8(options.dstEndpoint, 4);
		cmd.payload.writeUInt16BE(options.cluster, 5);
		cmd.payload.writeUInt8((options.clientToServer ? 1 : 0), 7);
		cmd.payload.writeUInt8((options.manufacturerSpecific ? 1 : 0), 8);
		cmd.payload.writeUInt16BE(options.manufacturer || 0, 9);
		cmd.payload.writeUInt8(options.attributes.length || 0, 11);
		for (let i=0; i<options.attributes.length; ++i) {
			cmd.payload.writeUInt16BE(options.attributes[i], 12+i*2);
		}
		return cmd;
	},
};
