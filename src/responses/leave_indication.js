module.exports = {
	id: 0x8048,
	name: "leave_indication",
	parse: function(payload, rep) {
		rep.ieeeAddress = payload.slice(0,8).toString('hex');
		rep.rejoinStatus = payload.readUInt8(8);
	},
};
