let ELIGIBLE_MODEL_ID = ['lumi.weather'];

module.exports = {

	id: 'xiaomi_sensor_weather',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((s, value) => {
																		let data = [];
																		s.split('').forEach(c => {
																			if (c.charCodeAt(0) > 255) data.push(Math.floor(c.charCodeAt(0)/256), c.charCodeAt(0)%256);
																			else data.push(c.charCodeAt(0));
																		});
																		return (data[5]*256 + data[4])/1000;
																	})
									, unit: 'V', min:0.00, max: 3.00 }
		},

		temperature: { type:'float', attribute: {id: '0x1 0x402 0x0', toValue: ((attrval) => attrval/10) }, unit: '°C',  min:-20, max: 60   },
		humidity:    { type:'float', attribute: {id: '0x1 0x405 0x0', toValue: ((attrval) => attrval/100)}, unit: '%'  , min:-0,  max: 100  },
		pressure:    { type:'int',   attribute: {id: '0x1 0x403 0x0'                                     }, unit: 'hPa', min:800, max: 1200 },
	},

};
