let ELIGIBLE_MODEL_ID = ['lumi.sensor_switch.aq2'];

module.exports = {

	id: 'xiaomi_switch_key',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },

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
		push_x1: { attribute: { id:'0x1 0x6 0x0000', equal:true, args:[1]}  },
		push_x2: { attribute: { id:'0x1 0x6 0x8000', equal:2,    args:[2]}  },
		push_x3: { attribute: { id:'0x1 0x0 0x8000', equal:3,    args:[3]}  },
		push_x4: { attribute: { id:'0x1 0x0 0x8000', equal:4,    args:[4]}  },
	},

};
