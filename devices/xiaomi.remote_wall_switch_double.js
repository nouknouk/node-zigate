let ELIGIBLE_MODEL_ID = ['lumi.sensor_86sw2'];

module.exports = {

	id: 'xiaomi_remote_wall_switch_double',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((data, valueObj) => { return (data && data.length > 3) ? (data[3].charCodeAt(0)*256 + data[2].charCodeAt(0))/1000 : undefined; }), unit: 'V', min:0.00, max: 3.00 } },
	},

	events: {
		push_left: { attribute: { id:'0x1 0x6 0x0000', equal:true}  },
		push_right: { attribute: { id:'0x2 0x6 0x0000', equal:true}  },
	}
};
