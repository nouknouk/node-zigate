const Enum = require('../enum.js');

// (escaped) frame exemple:
//     [0x01, 0x80, 0x00, 0x00, 0x05, 0xFB, 0x00, 0x3B, 0x00, 0x45, 0x00, 0x03]

// parsed response example:
//     status(0x8000), status:{"id":0,"name":"success"}, sequence:115, relatedTo:descriptor_node(0x42), rssi:0


module.exports = {
	id: 0x8000,
	name: "status",
	parse: function(reader, rep, version) {
		rep.status = Enum.STATUS(reader.nextUInt8(), (id)=>{ return {id:'0x'+id.toString(16), name:"unknown"}; });
		rep.sequence = reader.nextUInt8();
		rep.relatedTo = Enum.COMMANDS(reader.nextUInt16BE(), {id:0, name:'null'});
		if (reader.isMore()) {
			rep.error = reader.restAll().toString();
		}
	},
};
