module.exports = {

	match: function(device) {
		if (device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value === 'lumi.sensor_cube') {
			return 1000;
		}
	},

	actions: {
		test: { exec: (() => { this.log("custom cube test action executed on "+this); }) },
	},

	type_add: function(device) {
	},
	type_remove: function(device) {
	},

};
