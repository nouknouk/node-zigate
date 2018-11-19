batterySizeEnum = {
	0x00: 'no battery',
	0x01: 'built in',
	0x02: 'other',
	0x03: 'AA',
	0x04: 'AAA',
	0x05: 'C',
	0x06: 'D',
	0x07: 'CR2',
	0x08: 'CR123A',
	0xff: 'unknown',
};

batteryAlarmBits = {
		0: 'battery too low',
		1: 'battery threshold 1',
		2: 'battery threshold 2',
		3: 'battery threshold 3',
};


module.exports = {
	"id": 1,
	"name": "genPowerCfg",
	"specific": null,
	"attributes": {
		"0": { "cluster": 1, "id": 0, "name": "mainsVoltage", "type": "uint16", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '100mV' },
		"1": { "cluster": 1, "id": 1, "name": "mainsFrequency", "type": "uint8", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '2Hz' },
		"16": { "cluster": 1, "id": 16, "name": "mainsAlarmMask", "type": "bitmap8", "mandatory": false, "read": true, "write": false, "specific": false, "unit": null },
		"17": { "cluster": 1, "id": 17, "name": "mainsVoltMinThreshold", "type": "uint16", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '100mV' },
		"18": { "cluster": 1, "id": 18, "name": "mainsVoltMaxThreshold", "type": "uint16", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '100mV' },
		"19": { "cluster": 1, "id": 19, "name": "mainsVoltageDwellTripPoint", "type": "uint16", "mandatory": false, "read": true, "write": false, "specific": false, "unit": 'second' },
		"32": { "cluster": 1, "id": 32, "name": "batteryVoltage", "type": "uint8", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '100mV' },
		"33": { "cluster": 1, "id": 33, "name": "batteryPercentageRemaining", "type": "uint8", "mandatory": false, "read": true, "write": false, "specific": false, "unit": '0.5%', default:0 },
		"48": { "cluster": 1, "id": 48, "name": "batteryManufacturer", "type": "string", "mandatory": null, "read": true, "write": true, "specific": false, "unit": null, default:'' },
		"49": { "cluster": 1, "id": 49, "name": "batterySize", "type": "enum8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": null, default:0xff, enum: batterySizeEnum },
		"50": { "cluster": 1, "id": 50, "name": "batteryAHrRating", "type": "uint16", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '10mAh' },
		"51": { "cluster": 1, "id": 51, "name": "batteryQuantity", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": null },
		"52": { "cluster": 1, "id": 52, "name": "batteryRatedVoltage", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '100mV' },
		"53": { "cluster": 1, "id": 53, "name": "batteryAlarmMask", "type": "bitmap8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": null, default:0, bits: batteryAlarmBits },
		"54": { "cluster": 1, "id": 54, "name": "batteryVoltMinThres", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '100mV', default:0 },
		"55": { "cluster": 1, "id": 55, "name": "batteryVoltThres1", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '100mV', default:0 },
		"56": { "cluster": 1, "id": 56, "name": "batteryVoltThres2", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '100mV', default:0 },
		"57": { "cluster": 1, "id": 57, "name": "batteryVoltThres3", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '100mV', default:0 },
		"58": { "cluster": 1, "id": 58, "name": "batteryPercentMinThreshold", "type": "uint8", "mandatory": null, "read": true, "write": true, "specific": false, "unit": '%', default:0 },
		"59": { "cluster": 1, "id": 59, "name": "batteryPercentThreshold1", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": false, "unit": '%', default:0 },
		"60": { "cluster": 1, "id": 60, "name": "batteryPercentThreshold2", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": false, "unit": '%', default:0 },
		"61": { "cluster": 1, "id": 61, "name": "batteryPercentThreshold3", "type": "uint8", "mandatory": null, "read": null, "write": null, "specific": false, "unit": '%', default:0 },
		"62": { "cluster": 1, "id": 62, "name": "batteryAlarmState", "type": "bitmap32", "mandatory": null, "read": true, "write": false, "specific": false, "unit": null, default:0 }
	},
	"commands": {},
	"responses": {},
};
