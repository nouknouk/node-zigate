module.exports = {
	id: 0x8043,
	name: "simple_descriptor_response",
	parse: function(reader, rep) {
		rep.srcSequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		rep.srcAddress = reader.nextUInt16BE();
		rep.length = reader.nextUInt8();   // ???
		rep.endpoint = reader.nextUInt8();
		rep.profileId = reader.nextUInt16BE();
		rep.deviceId = reader.nextUInt16BE();

		var bitsField = reader.nextUInt8();
		rep.deviceVersion = bitsField & 0x0F; // bits 0-4
		rep.reserved = bitsField >> 4; // bits 4-7

		rep.inClusters = [];
		var inCount = reader.nextUInt8();
		for(let i=0; i<inCount; ++i) {
			rep.inClusters.push(reader.nextUInt16BE());
		}

		rep.outClusters = [];
		var outCount = reader.nextUInt8();
		for(let i=0; i<outCount; ++i) {
			rep.outClusters.push(reader.nextUInt16BE());
		}
	},
};


<Sequence number: uint8_t>
<status: uint8_t>
<nwkAddress: uint16_t>
<length: uint8_t>
<endpoint: uint8_t>
<profile: uint16_t>
<device id: uint16_t>
<bit fields: uint8_t >
<InClusterCount: uint8_t >
<In cluster list: data each entry is uint16_t>
<OutClusterCount: uint8_t>
<Out cluster list: data each entry is uint16_t>
Bit fields:
Device version: 4 bits (bits 0-4)
Reserved: 4 bits (bits4-7)
