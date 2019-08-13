const Enum = require('../enum.js');

module.exports = {
	id: 0x8009,
	name: "network_state",
	parse: function(reader, rep, version) {
		rep.address = reader.nextUInt16BE();
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.panid = reader.nextUInt16BE();
		rep.ieeepanid = reader.nextBuffer(8).toString('hex');
		rep.channel = reader.nextUInt8();
		rep.networkUp = (rep.panid !== 0);
	},
};
