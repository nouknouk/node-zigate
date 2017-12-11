module.exports = {
	id: 0x8048,
	name: "leave_indication",
	parse: function(reader, rep) {
		rep.ieeeAddress = reader.nextBuffer(8).toString('hex');
		rep.rejoinStatus = reader.nextUInt8();
	},
};
