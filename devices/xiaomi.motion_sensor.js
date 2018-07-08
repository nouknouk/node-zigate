let ELIGIBLE_MODEL_ID = ['lumi.sensor_motion','lumi.sensor_motion.aq2'];

module.exports = {

	id: 'xiaomi_motion_sensor',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },

		presence:    { type:'bool',   attribute: {id: '0x0001 0x0406 0x0000', toValue: ((attrval) => attrval===1) }  },
		luminance:   { type:'float',  attribute: {id: '0x0001 0x0400 0x0000', toValue: ((attrval) => attrval/100)}, unit: '%'  , min:-0,  max: 100  },

		// to be confirmed
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
		// to be confirmed
	},

	events: {
		motion:    { attribute: {id: '0x0001 0x0000 0x0005', equal: 1}, },
	},

};
