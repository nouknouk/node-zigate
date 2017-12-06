module.exports = {
	typeid: 0x0025,
	typename: "start_network_scan", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

