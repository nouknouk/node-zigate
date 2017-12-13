const Enum = require('../constants.js');

module.exports = {
	id: 0x8102,
	name: "attribute_report",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.address = reader.nextUInt16BE();
		rep.endpoint = reader.nextUInt8();
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
		rep.id = reader.nextUInt16BE();
		rep.status = Enum.ATTRIBUTE_STATUS(reader.nextUInt8());
		rep.type = Enum.ATTRIBUTE_TYPE(reader.nextUInt8(), new Error('unknown attribute type '));
		rep.value = undefined;

		var attributeSize = reader.nextUInt16BE();
		var valueData = reader.nextBuffer(attributeSize);
		switch (rep.type.id) {
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
