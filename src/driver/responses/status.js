
// 0x01, 0x80, 0x00, 0x00, 0x05, 0xFB, 0x00, 0x3B, 0x00, 0x45, 0x00, 0x03

const TYPE_TO_NAME = {
	0: 'success',
	1: "Incorrect parameters",
	2: "Unhandled command",
	3: "Command failed",
	4: "Busy (Node is carrying out a lengthy operation and is currently unable to handle the incoming command)",
	5: "Stack already started (no new configuration accepted)",
	/* 128 – 244 = Failed (ZigBee event codes)" */
};
for (var i=128; i<=244; ++i) TYPE_TO_NAME[i] = "failed (ZigBee event codes)";

module.exports = {
	id: 0x8000,
	name: "status",
	parse: function(reader, rep) {
		rep.status = reader.nextUInt8();
		rep.satusText = TYPE_TO_NAME[rep.status];
		rep.srcSequence = reader.nextUInt8();
		rep.packetType = reader.nextUInt16BE();
		rep.packetTypename = TYPE_TO_NAME[rep.packetType];
		rep.error = (reader.isMore()) ? reader.restAll().toString() : undefined;
	},
};
