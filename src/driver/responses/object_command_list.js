module.exports = {
	id: 0x8005,
	name: "object_command_list",
	parse: function(reader, rep) {
		rep.srcEndpoint = reader.nextUInt8();
		rep.profileId = reader.nextUInt16BE();
		rep.clusterId = reader.nextUInt16BE();
		
		rep.commands = [];
		while (reader.isMore()) {
			rep.commands.push(reader.nextUInt8());
		}
	},
};
