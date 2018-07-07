module.exports = {

	match: function(device) {
		if (device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value === 'lumi.weather') {
			return 1000;
		}
	},

	values: {
		temperature: { type:'float', command: {id: '0x1 0x402 0x0', toValue: ((attrval) => attrval/10)} },
		humidity:    { type:'float', command: {id: '0x1 0x405 0x0', toValue: ((attrval) => attrval/10)} },
		pressure:    { type:'float', command: {id: '0x1 0x403 0x0', toValue: ((attrval) => attrval/10)} },
	},

	actions: {
		test: { exec: (() => { this.log("custom THERMOMETER test action executed on "+this); }) },
	},

	type_add: function(device) {
	},
	type_remove: function(device) {
	},

};
