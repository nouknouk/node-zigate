module.exports = {
	typeid: 0x8010,
	typename: "version_list",
	parse: function(payload) {
		var rep = {
			type: this.typeid,
		};
		rep.major = payload.readUInt16BE(0);
		rep.installer = payload.readUInt16BE(2);
		return rep;
	},
};
