// parsed response example:
//    descriptor_complex(0x8034), sequence:117, status:132, interest:0, xmlTag:0, values:[], rssi:108

module.exports = {
	id: 0x8034,
	name: "descriptor_complex",
	parse: function(reader, rep, version) {
		rep.sequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		rep.interest = reader.nextUInt16BE();
		rep.xmlTag = reader.nextUInt8();

		rep.values = [];
		var fieldCount = reader.nextUInt8();
		for(let i=0; i<fieldCount; ++i) {
			rep.values.push(reader.nextUInt8());
		}
	},
};
