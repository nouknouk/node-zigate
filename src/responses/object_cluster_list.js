
// 01     80 03     00 1a     8d     01 01 04 04 05 05 00 04 00 04 02 04 03 04 05 04 06 07 02 0b 03 0b 04 10 00 00

module.exports = {
	id: 0x8003,
	name: "object_cluster_list",
	parse: function(payload, rep) {
		rep.srcEndpoint = payload.readUInt8(0);
		rep.profileId = payload.readUInt16BE(1);
		rep.clusters = []
		for (i=3; (i+1)<payload.length; i+=2) {
			rep.clusters.push(payload.readUInt16BE(i));
		}
	},
};
