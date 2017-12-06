module.exports = {
	typeid: 0x0045,
	typename: "active_endpoint_request", 
	
	build: function(options) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		if (isNaN(parseInt(options.endpoint))) throw new Error("invalid mandatory parameter 'endpoint'.");
		
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(3),
		};
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		cmd.payload.writeUInt8(parseInt(options.endpoint), 2);
		return cmd;
	},
};

