module.exports = {

	match: function(device) {
		if (device.attributes.find( a => a.id == 5 && a.cluster.id == 0 && a.value == 'lumi.weather')) {
			device.log.info("matched "+device+" as 'lumi.weather'");
			return 1000;
		}
	},

	setup: function(device) {

	},

};
