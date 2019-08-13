module.exports = {
	id: 0x8002,
	name: "data_indication",
	parse: function(reader, rep, version) {
		rep.status = Enum.COMMAND_STATUS(reader.nextUInt8(), new Error("data_indication: unknown status"));

		rep.profile = Enum.PROFILES(reader.nextUInt16BE(), new Error("data_indication: unknown profile"));
		rep.cluster = Enum.CLUSTERS(reader.nextUInt16BE(), new Error("data_indication: unknown cluster"));
		rep.endpointSource = reader.nextUInt8();
		rep.endpointDestination = reader.nextUInt8();

		rep.addressSourceMode = Enum.ADDRESS_MODE(reader.nextUInt8());
		rep.addressSource = rep.addressSourceMode.name === 'short' ? reader.nextUInt16BE() : reader.nextBuffer(8).toString('hex');

		rep.addressDestinationMode = Enum.ADDRESS_MODE(reader.nextUInt8());
		rep.addressDestination = rep.addressDestinationMode.name === 'short' ? reader.nextUInt16BE() : reader.nextBuffer(8).toString('hex');

		var dataSize = reader.nextUInt8();
		rep.data = [];
		for (var i=0; i<dataSize; ++i) {
			rep.data.push(reader.nextUInt8())
		}
	},
};
