let ELIGIBLE_MODEL_ID = ['lumi.vibration.aq1'];

module.exports = {

	id: 'xiaomi_vibration_sensor',

	match: function(device) {
		let modelId = device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value;
		if (ELIGIBLE_MODEL_ID.includes(modelId)) return 1000;
	},

	values: {
		modelId:     { type:'string', attribute: {id: '0x0001 0x0000 0x0005' }  },
		battery:     { type:'float',  attribute: {id: '0x0001 0x0000 0xff01', toValue: ((data, valueObj) => { return (data && data.length > 3) ? (data[3].charCodeAt(0)*256 + data[2].charCodeAt(0))/1000 : undefined; }), unit: 'V', min:0.00, max: 3.00 } },

	},

  events: {
    tilt:    { attribute: { id: '0x0001 0x0101 0X0055', equal: 2 } },
    catch:   { attribute: { id: '0x0001 0x0101 0X0055', equal: 2 } },
    fall:    { attribute: { id: '0x0001 0x0101 0X0055', equal: 3 } },
  },

};
