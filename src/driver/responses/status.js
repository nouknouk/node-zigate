const Enum = require('../enum.js');

// 0x01, 0x80, 0x00, 0x00, 0x05, 0xFB, 0x00, 0x3B, 0x00, 0x45, 0x00, 0x03

module.exports = {
	id: 0x8000,
	name: "status",
	parse: function(reader, rep) {
		rep.status = Enum.STATUS(reader.nextUInt8(), {id:-1, name:"unknown"});
		rep.sequence = reader.nextUInt8();
		rep.relatedTo = Enum.COMMANDS(reader.nextUInt16BE(), {id:0, name:'null'});
		if (reader.isMore()) {
			rep.error = reader.restAll().toString();
		}
	},
};
