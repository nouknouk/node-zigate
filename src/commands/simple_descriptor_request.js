module.exports = {
	typeid: 0x0043,
	typename: "simple_descriptor_request", 
	
	build: function(options) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(2),
		};
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		return cmd;
	},
};

