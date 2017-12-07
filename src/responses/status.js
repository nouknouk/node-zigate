
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
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.sequence = payload.readUInt8(1);
		rep.packetType = payload.readUInt16BE(2);
		rep.packetTypename = TYPE_TO_NAME[payload.readUInt16BE(2)];
		rep.error = (payload.length > 4) ? payload.slice(4, payload.length).toString('utf8') : null;
	},
};
