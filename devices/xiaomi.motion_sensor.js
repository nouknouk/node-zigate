let ELIGIBLE_MODEL_ID = ['lumi.sensor_motion','lumi.sensor_motion.aq2'];

module.exports = {

	id: 'xiaomi_motion_sensor',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((data, valueObj) => { return (data && data.length > 3) ? (data[3].charCodeAt(0)*256 + data[2].charCodeAt(0))/1000 : undefined; }), unit: 'V', min:0.00, max: 3.00 } },

		presence:    { type:'bool',   attribute: {id: '0x0001 0x0406 0x0000', toValue: ((attrval) => typeof(attrval) === 'number' ? (attrval===1) : undefined) }  },
		luminance:   { type:'float',  attribute: {id: '0x0001 0x0400 0x0000', toValue: ((attrval) => typeof(attrval) === 'number' ? (attrval/100) : undefined) }, unit: '%'  , min:-0,  max: 100  },
	},

	events: {
		motion:    { attribute: {id: '0x0001 0x0000 0x0005', equal: 1}, },
	},

};
