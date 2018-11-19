tempAlarmBits = {
	0: 'temperature too low',
	1:'temperature too high',
};


module.exports = {
	"id": 2,
	"name": "genDeviceTempCfg",
	"specific": null,
	"attributes": {
		"0":  { "cluster": 2, "id": 0,  "name": "currentTemperature",     "type": "int16",   "mandatory": false, "read": true, "write": false, "specific": false, "unit": '°C' },
		"1":  { "cluster": 2, "id": 1,  "name": "minTempExperienced",     "type": "int16",   "mandatory": false, "read": true, "write": false, "specific": false, "unit": '°C' },
		"2":  { "cluster": 2, "id": 2,  "name": "maxTempExperienced",     "type": "int16",   "mandatory": false, "read": true, "write": false, "specific": false, "unit": '°C' },
		"3":  { "cluster": 2, "id": 3,  "name": "overTempTotalDwell",     "type": "uint16",  "mandatory": false, "read": true, "write": false, "specific": false, "unit": 'hour' },
		"16": { "cluster": 2, "id": 16, "name": "devTempAlarmMask",       "type": "bitmap8", "mandatory": false, "read": true, "write": true,  "specific": false, "unit": 'tempAlarmBits' },
		"17": { "cluster": 2, "id": 17, "name": "lowTempThres",           "type": "int16",   "mandatory": false, "read": true, "write": true,  "specific": false, "unit": '°C' },
		"18": { "cluster": 2, "id": 18, "name": "highTempThres",          "type": "int16",   "mandatory": false, "read": true, "write": true,  "specific": false, "unit": '°C' },
		"19": { "cluster": 2, "id": 19, "name": "lowTempDwellTripPoint",  "type": "uint24",  "mandatory": false, "read": true, "write": true,  "specific": false, "unit": 'second' },
		"20": { "cluster": 2, "id": 20, "name": "highTempDwellTripPoint", "type": "uint24",  "mandatory": false, "read": true, "write": true,  "specific": false, "unit": 'second' }
	},
	"commands": {
	},
	"responses": {
	},
};
