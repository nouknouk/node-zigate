LOG_LEVEL_TEXT = {
	0: "emergency",
	1: "alert",
	2: "critical",
	3: "error",
	4: "warning",
	5: "notice",
	6: "information",
	7: "debug",
}
module.exports = {
	id: 0x8001,
	name: "log_message",
	parse: function(payload, rep) {
		rep.level = payload.readUInt8(0);
		rep.levelText = LOG_LEVEL_TEXT[rep.level];
		rep.message = payload.slice(1,payload.length).toString();
	},
};
