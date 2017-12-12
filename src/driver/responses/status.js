
// 0x01, 0x80, 0x00, 0x00, 0x05, 0xFB, 0x00, 0x3B, 0x00, 0x45, 0x00, 0x03

const STATUS_TO_NAME = {
	0: 'success',
	1: "invalid_params",
	2: "unhandled_command",
	3: "command_failed",
	4: "busy", // Node is carrying out a lengthy operation and is currently unable to handle the incoming command
	5: "stack_already started", // Stack already started (no new configuration accepted)
};
for (var i=128; i<=244; ++i) STATUS_TO_NAME[i] = "failed"; // (ZigBee event codes)

module.exports = {
	id: 0x8000,
	name: "status",
	parse: function(reader, rep) {
		rep.srcSequence = reader.nextUInt8();
		rep.satusText = STATUS_TO_NAME[rep.status];
		rep.status = reader.nextUInt8();
		rep.requestType = reader.nextUInt16BE();
		rep.error = (reader.isMore()) ? reader.restAll().toString() : undefined;
	},
};
