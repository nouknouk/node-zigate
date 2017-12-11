module.exports = {
	id: 0x8014,
	name: "permit_join_status_response",
	parse: function(reader, rep) {
		rep.status = reader.nextUInt8();
		rep.statusText = rep.status ? 'on' : 'off';
		rep.enabled = rep.status ? true : false;
	},
};
