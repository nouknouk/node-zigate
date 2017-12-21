
triggerEffectEnum: {
	0x00: 'blink',
	0x01: 'breathe',
	0x02: 'okay',
	0x0b: 'channel change',
	0xfe: 'finish effect',
	0xff: 'stop effect',
	
};

module.exports = {
	"id": 3,
	"name": "genIdentify",
	"specific": null,
	"attributes": {
		0x00: { "cluster": 3, "id": 0, "name": "identifyTime", "type": "uint16", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null },
		0x01: { "cluster": 3, "id": 1, "name": "identifyCommissionState", "type": "unknown", "mandatory": null, "read": null, "write": null, "specific": null, "unit": null }
	},
	"commands": {
		0x00: { "id": 0, "name": "identify", "mandatory": true, "specific": false, params: [{name: "time", "type": "uint16", }]},
		0x01: { "id": 1, "name": "identifyQuery", "mandatory": true, "specific": false, params: [] },
		0x02: { "id": 2, "name": "ezmodeInvoke", "mandatory": false, "specific": true, params: [] },
		0x03: { "id": 3, "name": "updateCommissionState" "mandatory": false, "specific": true, params: [] },
		0x40: { "id": 64, "name": "triggerEffect", "mandatory": false, "specific": false, params: [{name: "effect", "type": "enum8", enum:triggerEffectEnum}, {name: "variant", "type": "uint8"}], }
	},
	"responses": {
		0x00: { "id": 0, "name": "identifyQueryRsp", "mandatory": true, "specific": false, params: [{name: "timeout", "type": "uint16", unit:'second'}],  }
	},
};

