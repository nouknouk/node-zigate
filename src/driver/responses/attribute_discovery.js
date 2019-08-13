const Enum = require('../enum.js');

module.exports = {
	id: 0x8140,
	name: "attribute_discovery",
	parse: function(reader, rep, version) {
		rep.complete = !!(reader.nextUInt8());
		rep.type = Enum.ATTRIBUTE_TYPE(reader.nextUInt8(), new Error('unknown attribute type '));
		rep.id = reader.nextUInt16BE();

		if (version >= 783 /*3.0f*/ ) {
			rep.address = reader.nextUInt16BE();
			rep.endpoint = reader.nextUInt8();
			rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
		}
	},
};
