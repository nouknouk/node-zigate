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

module.exports = {
	id: 0x8101,
	name: "default_response",
	parse: function(payload, rep) {
		rep.srcSequence = payload.readUInt8(0);
		rep.endpoint = payload.readUInt8(1);
		rep.cluster = payload.readUInt16BE(2);
		rep.clusterName = CLUSTER_NAME[rep.cluster];
		rep.commandId = payload.readUInt8(4);
		rep.status = payload.readUInt8(5);
	},
};
