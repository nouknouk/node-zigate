module.exports = {
	typeid: 0x8014,
	typename: "permit_join_response",
	parse: function(payload) {
		var rep = {
			type: this.typeid,
		};
		rep.status = payload.readUInt8(0);
		return rep;
	},
};
