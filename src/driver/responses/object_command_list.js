const Enum = require('../constants.js');


module.exports = {
	id: 0x8005,
	name: "object_command_list",
	parse: function(reader, rep) {
		rep.endpoint = reader.nextUInt8();
		rep.profile = Enum.PROFILES(reader.nextUInt16BE(), (id) => { return {id: id, name: 'unknown profile '+id}; });
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE());
		
		rep.commands = [];
		while (reader.isMore()) {
			rep.commands.push(reader.nextUInt8());
		}
	},
};
