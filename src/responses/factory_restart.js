RESTART_STATUS_TEXT = {
	0: 'startup',
	2: 'nfn_start',
	6: 'running',
}
module.exports = {
	id: 0x8007,
	name: "factory_restart",
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.statusText = RESTART_STATUS_TEXT[rep.status];
	},
};
