const Enum = require('../constants.js');

// 01     80 04     00 1c     df     01 01 04 00 00 00 00 00 01 00 02 00 03 00 04 00 05 00 06 00 07 40 00 ff 01 ff 02 00
// 01     80 04     00 08     8b     01 01 04 00 03 00 00 00

module.exports = {
	id: 0x8004,
	name: "object_attribute_list",
	parse: function(reader, rep) {
		rep.endpoint = reader.nextUInt8();
		rep.profile = Enum.PROFILES(reader.nextUInt16BE(), (id) => { return {id: id, name: 'unknown profile '+id}; });
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE(3));
		
		rep.attributes = []
		while(reader.isMore()) {
			rep.attributes.push(reader.nextUInt16BE());
		}
	},
};
