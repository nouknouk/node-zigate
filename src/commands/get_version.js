module.exports = {
	typeid: 0x0010,
	typename: "get_version", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

