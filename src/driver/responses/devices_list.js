const Enum = require('../enum.js');

// 01  /  80 24  /  00 0d  /  b3  /  01 00 00 00 15 8d 00 01 b2 2e 15 0b 00

module.exports = {
	id: 0x8015,
	name: "devices_list",
	parse: function(reader, rep) {
		rep.devices = [];
		while(reader.isMore()) {
			let device = {};
			device.address = reader.nextUInt16BE();
			let powerSource = reader.nextUInt8();
			device.ACPowered = powerSource === 0;
			device.batteryPowered = powerSource === 1;
			device.linkQuality = reader.nextUInt8();

			rep.devices.push(device);
		}
		return rep;
	},

};
