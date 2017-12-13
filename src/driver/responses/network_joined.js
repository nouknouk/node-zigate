const Enum = require('../constants.js');

// 01  /  80 24  /  00 0d  /  b3  /  01 00 00 00 15 8d 00 01 b2 2e 15 0b 00

module.exports = {
	id: 0x8024,
	name: "network_joined",
	parse: function(reader, rep) {
		rep.status = Enum.NETWORK_JOIN_STATUS(reader.nextUInt8());
		rep.address = reader.nextUInt16BE();
		rep.ieee = reader.nextBuffer(8).toString('hex'); // JS doesn't handle 64 bits integers.
		rep.channel = reader.nextUInt8();
	},
};
