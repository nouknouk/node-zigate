module.exports = {
	typeid: 0x0011,
	typename: "reset", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

