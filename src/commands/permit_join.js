module.exports = {
	typeid: 0x0014,
	typename: "permit_join", 
	build: function(options) {
		var cmd = {
			type: this.typeid,
			payload: Buffer.alloc(0),
		};
		
		return cmd;
	},
};

