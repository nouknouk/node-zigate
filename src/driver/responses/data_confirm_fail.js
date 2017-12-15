const Enum = require('../enum.js');

module.exports = {
	id: 0x8702,
	name: "data_confirm_fail",
	parse: function(reader, rep) {
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8(), new Error("data_confirm_fail: unknown status"));
		rep.endpointSource = reader.nextUInt8();
		rep.endpoint = reader.nextUInt8();
		rep.addressMode = Enum.ADDRESS_MODE(reader.nextUInt8());
		if (rep.addressMode.name === 'short') {
			rep.address = reader.nextUInt16BE();
		}
		else {
			rep.ieee = reader.nextBuffer(8).toString('hex');
		}
		rep.sequence = reader.nextUInt8();
	},
};
