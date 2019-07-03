module.exports = {
	id: 0x8095,
	name: "on_off_update",
	parse: function(reader, rep) {
		rep.sequence = reader.nextUInt8();
		rep.endpoint = reader.nextUInt8();
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE(), new Error("data_indication: unknown cluster"));
		rep.addressMode = Enum.ADDRESS_MODE(reader.nextUInt8());
		rep.address = rep.addressMode.name === 'short' ? reader.nextUInt16BE() : reader.nextBuffer(8).toString('hex');
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8());
	},
};
