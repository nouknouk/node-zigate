module.exports = {
	id: 0x8005,
	name: "object_command_list",
	parse: function(payload, rep) {
		rep.srcEndpoint = payload.readUInt8(0);
		rep.profileId = payload.readUInt16BE(1);
		rep.clusterId = payload.readUInt16BE(3);
		rep.commands = []
		for (i=5; i<payload.length; i++) {
			rep.commands.push(payload.readUInt8(i));
		}
	},
};
