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

const CLUSTER_NAME = {
	0x0000: 'basic',
	0x0001: 'power_config',
	0x0002: 'temperature_config',
	0x0003: 'identify',
	0x0004: 'groups',
	0x0005: 'scenes',
	0x0006: 'on_off',
	0x0007: 'on_off_config',
	0x0008: 'level_control',
	0x0009: 'alarms',
	0x000A: 'time',
	0x000F: 'binary_input_basic',
	0x0020: 'poll_control',
	0x0019: 'ota',
	0x0101: 'door_lock',
	0x0201: 'hvac_thermostat',
	0x0202: 'Hhvac_fan_control',
	0x0300: 'lightning_color_control',
	0x0400: 'measurement_illuminance',
	0x0402: 'measurement_temperature',
	0x0403: 'measurement_pressure',
	0x0405: 'measurement_humidity',
	0x0406: 'measurement_occupancy',
	0x0500: 'ias_zone',
	0x0702: 'energy_meter',
	0x0B05: 'misc_diagnostics',
	0x1000: 'zll',
	0xFF01: 'xiaomi_private_1',
	0xFF02: 'xiaomi_private_2',
	0x1234: 'xiaomi_private_3',
};

// (escaped) frame exemple:
// Buffer.from([0x01, 0x81, 0x02, 0x12, 0x02, 0x10, 0x19, 0x7F, 0x02, 0x10, 0xE1, 0xE1, 0x02, 0x11, 0x02, 0x10, 0x02, 0x10, 0x02, 0x10, 0x02, 0x15, 0x02, 0x10, 0x42, 0x02, 0x10, 0x02, 0x1C, 0x6C, 0x75, 0x6D, 0x69, 0x2E, 0x77, 0x65, 0x61, 0x74, 0x68, 0x65, 0x72, 0xE4, 0x03])

module.exports = {
	id: 0x8102,
	name: "attribute_report",
	parse: function(payload, rep) {
		rep.srcSequence = payload.readUInt8(0);
		rep.srcAddress = payload.readUInt16BE(1);
		rep.endpoint = payload.readUInt8(3);
		rep.cluster = payload.readUInt16BE(4);
		rep.clusterName = CLUSTER_NAME[rep.cluster];
		rep.attributeId = payload.readUInt16BE(6);
		rep.attributeStatus = payload.readUInt8(8);
		rep.attributeType = payload.readUInt8(9);
		rep.attributeTypeName = ATTRIBUTE_TYPE_NAME[rep.attributeType];
		rep.attributeSize = payload.readUInt16BE(10);

		var rawData = rep.attributeSize.slice(12, 12+rep.attributeSize);
		switch (rep.attributeType) {
			case 0x00: // null
				rep.value = null;
				break;
			case 0x10: // boolean
				rep.value = rawData.readUIntBE(rawData.length) ? true : false;
				break;
			case 0x18: // bitmap8
				rep.value = rawData;
				break;
			case 0x20: // uint8
			case 0x21: // uint16
			case 0x22: // uint32
			case 0x25: // uint48
				rep.value = rawData.readUIntBE(rawData.length);
				break;
			case 0x28: // int8
			case 0x29: // int16
			case 0x2a: // int32
				rep.value = rawData.readIntBE(rawData.length);
				break;
			case 0x30: // enum
				rep.value = rawData.readUIntBE(rawData.length);
				break;
			case 0x42: // string
				rep.value = rawData.toString();
				break;
		}
	},
};
