module.exports = {
	id: 0x8044,
	name: "descriptor_power",
	
	
	parse: function(reader, rep, version) {
		rep.sequence = reader.nextUInt8();
		rep.status = reader.nextUInt8();
		var flags = reader.nextUInt16BE();

		rep.powerMode = flags & 0x07; // 0 to 3: current power mode 	
		rep.availableSource = (flags >> 3) & 0x0F; // 4 to 7: available power source 	
		rep.currentSource = (flags >> 7) & 0x0F; // 8 to 11: current power source 	
		rep.currentLevel = (flags >> 12) & 0x0F; // 12 to 15: current power source level
	},
};
