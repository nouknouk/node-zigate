module.exports = {
	typeid: 0x0013,
	typename: "factory_new_reset", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

