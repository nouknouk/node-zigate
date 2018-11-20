const Enum = require('../enum.js');

// parsed response example:
//     attribute_report(0x8102), sequence:128, address:0x3dad, endpoint:1,
//     cluster:genBasic(0x0), attribute:65281, definition:unknown,
//     status:{"id":0,"name":"success","description":"Command was successful"},
//     valuetype:string(0x42), value:"toto", rssi:108

/*

<Sequence number: uint8_t>
			<Src address : uint16_t>
			<Endpoint: uint8_t>
			<Cluster id: uint16_t>
			<Attribute Enum: uint16_t>
			<Attribute status: uint8_t>
			<Attribute data type: uint8_t>
			<Size Of the attributes in bytes: uint16_t>
			<Data byte list : stream of uint8_t>


Zi.driver attribute_report(0x8102), sequence:90, address:0x7f69, endpoint:1, cluster:msRelativeHumidity(0x405), attribute:0, valuetype:uint16(0x21), value:252, rssi:201
Zi.driver 01-81 02-00 0f-cf-5a-7f 69-01-04 05-00 00-00-21-00 02-19 fc-c9
Zi - [device_0x7f69][cluster_msRelativeHumidity(0x405)][attr_measuredValue(0x0000)] data changed(252)

Zi.driver attribute_report(0x8102), sequence:91, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:0, valuetype:int16(0x29), value:229, rssi:204
Zi.driver 01 81 02 00 0f c5 5b 7f 69 01 04 03 00 00 00 29 00 02 03 e6-cc
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_measuredValue(0x0000)] data changed(229)

Zi.driver attribute_report(0x8102), sequence:91, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:20, valuetype:int8(0x28), value:254, rssi:204
Zi.driver 01 81 02 00 0e c8 5b 7f 69 01 04 03 00 14 00 28 00 01 ff-cc
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_(0x0014)] data changed(254)

Zi.driver attribute_report(0x8102), sequence:91, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:16, valuetype:int16(0x29), value:254, rssi:204
Zi.driver 01 81 02 00 0f e9 5b 7f 69 01 04 03 00 10 00 29 00 02 26 ff-cc
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_(0x0010)] data changed(254)

Zi.driver attribute_report(0x8102), sequence:92, address:0x7f69, endpoint:1, cluster:msTemperatureMeasurement(0x402), attribute:0, valuetype:int16(0x29), value:181, rssi:240
Zi.driver 01 81 02 00 0f a6 5c 7f 69 01 04 02 00 00 00 29 00 02 0a b6-f0
Zi - [device_0x7f69][cluster_msTemperatureMeasurement(0x402)][attr_measuredValue(0x0000)] data changed(181)

Zi.driver attribute_report(0x8102), sequence:93, address:0x7f69, endpoint:1, cluster:msRelativeHumidity(0x405), attribute:0, valuetype:uint16(0x21), value:94, rssi:237
Zi.driver 01 81 02 00 0f 43 5d 7f 69 01 04 05 00 00 00 21 00 02 14 5e-ed
Zi - [device_0x7f69][cluster_msRelativeHumidity(0x405)][attr_measuredValue(0x0000)] data changed(94)

Zi.driver attribute_report(0x8102), sequence:94, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:0, valuetype:int16(0x29), value:229, rssi:237
Zi.driver 01 81 02 00 0f e1 5e 7f 69 01 04 03 00 00 00 29 00 02 03 e6-ed
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_measuredValue(0x0000)] data changed(229)

Zi.driver attribute_report(0x8102), sequence:94, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:20, valuetype:int8(0x28), value:254, rssi:237
Zi.driver 01 81 02 00 0e ec 5e 7f 69 01 04 03 00 14 00 28 00 01 ff-ed
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_(0x0014)] data changed(254)

Zi.driver attribute_report(0x8102), sequence:94, address:0x7f69, endpoint:1, cluster:msPressureMeasurement(0x403), attribute:16, valuetype:int16(0x29), value:0, rssi:237
Zi.driver 01 81 02 00 0f 33 5e 7f 69 01 04 03 00 10 00 29 00 02 27 00-ed
Zi - [device_0x7f69][cluster_msPressureMeasurement(0x403)][attr_(0x0010)] data changed(0)

*/



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
		rep.valueData = reader.nextBuffer(attributeSize);
		rep.raw = JSON.stringify([...rep.valueData].map(e => Number(e).toString(16)));
		switch (rep.valuetype.id) {
			case 0x00: // null
				rep.value = null;
				break;

			case 0x10: // boolean
				rep.value = rep.valueData.readUIntBE(0, rep.valueData.length) ? true : false;
				break;

			case 0x18: // bitmap8
			case 0x19: // bitmap16
			case 0x1A: // bitmap24
			case 0x1B: // bitmap32
			case 0x1C: // bitmap40
			case 0x1D: // bitmap48
			case 0x1E: // bitmap56
			case 0x1F: // bitmap64
				rep.value = rep.valueData.readUIntBE(0, rep.valueData.length);
				break;

			case 0x20: // uint8
			case 0x21: // uint16
			case 0x22: // uint24
			case 0x23: // uint32
			case 0x24: // uint40
			case 0x25: // uint48
			case 0x26: // uint56
			case 0x27: // uint64
				rep.value = rep.valueData.readUIntBE(0, rep.valueData.length);
				break;

			case 0x28: // int8
			case 0x29: // int16
			case 0x2a: // int32
				rep.value = rep.valueData.readIntBE(0, rep.valueData.length);
				break;

			case 0x30: // enum
				var value = rep.valueData.readUIntBE(0, rep.valueData.length);
				if (rep.definition && rep.definition.enum && rep.definition.enum[value]) {
					rep.value = rep.definition.enum[rep.value];
				}
				else {
					rep.value = { id: value, name:null };
				}
				break;

			case 0x38: // semi precision (float)
				// TODO: test this.
				rep.value = float16_to_float( rep.valueData.readUInt16BE() );
				break;

			case 0x39: // single precision
				rep.value = rep.valueData.readFloatBE();
				break;

			case 0x3a: // double plecision
				rep.value = rep.valueData.readDoubleBE();
				break;

			case 0x41: // byte string ==> TODO: should we keep it as raw buffer ???
			case 0x42: // string
				rep.value = rep.valueData.toString('binary');
				break;

			case 0xff: // unknown
				rep.value = rep.valueData;
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
