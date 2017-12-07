module.exports = {
	id: 0x8014,
	name: "permit_join_status_response",
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.statusText = rep.status ? 'on' : 'off';
		rep.enabled = rep.status ? true : false;
	},
};
