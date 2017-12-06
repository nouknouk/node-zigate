module.exports = {
	typeid: 0x0012,
	typename: "erase_persistent_data", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

