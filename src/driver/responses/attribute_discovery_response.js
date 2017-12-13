const Enum = require('../constants.js');

module.exports = {
	id: 0x8140,
	name: "attribute_discovery_response",
	parse: function(reader, rep) {
		rep.complete = !!(reader.nextUInt8());
		rep.type = Enum.ATTRIBUTE_TYPE(reader.nextUInt8(), new Error('unknown attribute type '));
		rep.id = reader.nextUInt16BE();
	},
};
