module.exports = {
	typeid: 0x0024,
	typename: "start_network", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

