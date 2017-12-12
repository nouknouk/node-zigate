const ATTRIBUTE_TYPE_NAME = {
	0x00: 'null',
	0x10: 'boolean',
	0x18: 'bitmap8',
	0x20: 'uint8',
	0x21: 'uint16',
	0x22: 'uint32',
	0x25: 'uint48',
	0x28: 'int8',
	0x29: 'int16',
	0x2a: 'int32',
	0x30: 'enum',
	0x42: 'string',
};


module.exports = {
	id: 0x8140,
	name: "attribute_discovery_response",
	parse: function(reader, rep) {
		rep.complete = reader.nextUInt8() === 1 ? true : false;
		rep.attributeType = reader.nextUInt8();
		rep.attributeTypeName = ATTRIBUTE_TYPE_NAME[rep.attributeType];
		rep.attributeId = reader.nextUInt16BE();
	},
};
