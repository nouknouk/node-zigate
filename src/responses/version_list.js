module.exports = {
	id: 0x8010,
	name: "version_list",
	parse: function(payload, rep) {
		rep.major = payload.readUInt16BE(0);
		rep.installer = payload.readUInt16BE(2);
	},
};
