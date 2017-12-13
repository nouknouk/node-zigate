const Enum = require('../constants.js');

// 01     80 03     00 1a     8d     01 01 04 04 05 05 00 04 00 04 02 04 03 04 05 04 06 07 02 0b 03 0b 04 10 00 00

module.exports = {
	id: 0x8003,
	name: "object_cluster_list",
	parse: function(reader, rep) {
		rep.endpoint = reader.nextUInt8();
		rep.profile = Enum.PROFILES(reader.nextUInt16BE(), (id) => { return {id: id, name: 'unknown profile '+id}; });
		
		rep.clusters = [];
		while(reader.isMore()) {
			rep.clusters.push(
				Enum.CLUSTERS(reader.nextUInt16BE())
			);
		}
	},
};
