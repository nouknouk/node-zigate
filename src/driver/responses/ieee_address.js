const Enum = require('../enum.js');

module.exports = {
	id: 0x8041,
	name: "ieee_address",
	
	
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8(), new Error("ieee_address: unknown status"));
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.address = reader.nextUInt16BE();
		let count = reader.nextUInt8();
		rep.start = reader.nextUInt8();
		
		rep.devices = [];
		for (let i=0; i<count; ++i) {
			rep.devices.push(reader.nextUInt16BE());
		}
	},
};

