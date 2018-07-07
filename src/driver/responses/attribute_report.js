const Enum = require('../enum.js');

// parsed response example:
//     attribute_report(0x8102), sequence:128, address:0x3dad, endpoint:1,
//     cluster:genBasic(0x0), attribute:65281, definition:unknown,
//     status:{"id":0,"name":"success","description":"Command was successful"},
//     valuetype:string(0x42), value:"toto", rssi:108

module.exports = {
	id: 0x8102,
	name: "attribute_report",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.address = reader.nextUInt16BE();
		rep.endpoint = reader.nextUInt8();
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
		rep.attribute = reader.nextUInt16BE();
		rep.definition = (rep.cluster && rep.cluster.attributes && rep.cluster.attributes[rep.attribute]) || null;
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8());
		rep.valuetype = Enum.ATTRIBUTE_TYPE(reader.nextUInt8(), new Error('unknown attribute type '));
		rep.value = undefined;



		var attributeSize = reader.nextUInt16BE();
		var valueData = reader.nextBuffer(attributeSize);
		switch (rep.valuetype.id) {
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
			var value = valueData.readUIntBE(valueData.length);
				if (rep.definition && rep.definition.enum && rep.definition.enum[value]) {
					rep.value = rep.definition.enum[rep.value];
				}
				else {
					rep.value = { id: value, name:null };
				}
			case 0x38: // semi precision (float)

				// TODO: test this.
				rep.Value = float16_to_float( valueData.readUInt16BE() );
			case 0x39: // single precision
				rep.Value = valueData.readFloatBE();
				break;
			case 0x3a: // double plecision
			rep.Value = valueData.readDoubleBE();
			break;
			case 0x42: // string
				rep.value = valueData.toString();
				break;
			case 0xff: // unknown
				rep.value = valueData;
				break;

			default:
		  throw new Error("attribute_report: un-implemented read value type "+rep.valuetype+" (size="+attributeSize+")");
		 }


	},
};



const float16_to_float = function(h) {
		var s = (h & 0x8000) >> 15;
		var e = (h & 0x7C00) >> 10;
		var f = h & 0x03FF;

		if(e == 0) {
				return (s?-1:1) * Math.pow(2,-14) * (f/Math.pow(2, 10));
		} else if (e == 0x1F) {
				return f?NaN:((s?-1:1)*Infinity);
		}

		return (s?-1:1) * Math.pow(2, e-15) * (1+(f/Math.pow(2, 10)));
}
