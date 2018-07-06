const Enum = require('../enum.js');

module.exports = {
	id: 0x0015,
	name: "devices_list",
	statusExpected: true,
	responseExpected: 'devices_list',

	build: function(options, cmd) {
		return cmd;
	},
};
