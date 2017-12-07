
// 01     80 04     00 1c     df     01 01 04 00 00 00 00 00 01 00 02 00 03 00 04 00 05 00 06 00 07 40 00 ff 01 ff 02 00
// 01     80 04     00 08     8b     01 01 04 00 03 00 00 00

module.exports = {
	id: 0x8004,
	name: "object_attribute_list",
	parse: function(payload, rep) {
		rep.srcEndpoint = payload.readUInt8(0);
		rep.profileId = payload.readUInt16BE(1);
		rep.clusterId = payload.readUInt16BE(3);
		rep.attributes = []
		for (i=5; (i+1)<payload.length; i+=2) {
			rep.attributes.push(payload.readUInt16BE(i));
		}
	},
};
