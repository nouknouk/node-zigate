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

// (escaped) frame exemple:
// Buffer.from([0x01, 0x81, 0x02, 0x12, 0x02, 0x10, 0x19, 0x7F, 0x02, 0x10, 0xE1, 0xE1, 0x02, 0x11, 0x02, 0x10, 0x02, 0x10, 0x02, 0x10, 0x02, 0x15, 0x02, 0x10, 0x42, 0x02, 0x10, 0x02, 0x1C, 0x6C, 0x75, 0x6D, 0x69, 0x2E, 0x77, 0x65, 0x61, 0x74, 0x68, 0x65, 0x72, 0xE4, 0x03])

module.exports = {
	id: 0x8100,
	name: "attribute_read",
	parse: function(reader, rep) {
		rep.srcSequence = reader.nextUInt8();
		rep.srcAddress = reader.nextUInt16BE();
		rep.srcEndpoint = reader.nextUInt8();
		rep.clusterId = reader.nextUInt16BE();
		rep.attributeId = reader.nextUInt16BE();
		rep.attributeStatus = reader.nextUInt8();
		rep.attributeType = reader.nextUInt8();
		rep.attributeTypeName = ATTRIBUTE_TYPE_NAME[rep.attributeType];
		rep.attributeSize = reader.nextUInt16BE();

		rep.value = undefined;
		var valueData = reader.nextBuffer(rep.attributeSize);
		switch (rep.attributeType) {
			case 0x00: // null
				rep.value = null;
				break;
			case 0x10: // boolean
				rep.value = valueData.readUIntBE(valueData.length) ? true : false;
				break;
			case 0x18: // bitmap8
				rep.value = valueData.readUIntBE(valueData.length);
				break;
			case 0x20: // uint8
			case 0x21: // uint16
			case 0x22: // uint32
			case 0x25: // uint48
				rep.value = valueData.readUIntBE(valueData.length);
				break;
			case 0x28: // int8
			case 0x29: // int16
			case 0x2a: // int32
				rep.value = valueData.readIntBE(valueData.length);
				break;
			case 0x30: // enum
				rep.value = valueData.readUIntBE(valueData.length);
				break;
			case 0x42: // string
				rep.value = valueData.toString();
				break;
		}
	},
};
