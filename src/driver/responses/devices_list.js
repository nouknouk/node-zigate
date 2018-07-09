const Enum = require('../enum.js');

module.exports = {
	id: 0x8015,
	name: "devices_list",
	parse: function(reader, rep) {
		rep.devices = [];
		while(reader.isMore()) {
			let device = {};
			device.id = reader.nextUInt8();
			device.address = reader.nextUInt16BE();
			device.ieee = reader.nextBuffer(8).toString('hex');
			device.battery = reader.nextUInt8();
			device.linkQuality = reader.nextUInt8();

			rep.devices.push(device);
		}
		return rep;
	},
};
