let ELIGIBLE_MODEL_ID = ['lumi.sensor_wleak.aq1'];

module.exports = {

	id: 'xiaomi_water_sensor',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((data, valueObj) => { return (data && data.length > 3) ? (data[3].charCodeAt(0)*256 + data[2].charCodeAt(0))/1000 : undefined; }), unit: 'V', min:0.00, max: 3.00 } },

    water:       { type:'bool',   attribute: {id: '0x0001 0x0500 0x0002', toValue: ((data, valueObj) => (data===1) ? true : ((data===0) ? false : undefined)) } },
	},

};
