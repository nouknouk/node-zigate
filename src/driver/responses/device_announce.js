module.exports = {
	id: 0x004D,
	name: "device_announce",
	
	
	parse: function(reader, rep, version) {
		rep.address = reader.nextUInt16BE();
		rep.ieee = reader.nextBuffer(8).toString('hex');

		rep.alternatePanCoordinator = !!(rep.mac & 0x1); // Alternative PAN Coordinator, always 0
		rep.fullFunctionDevice = !!(rep.mac & 0x2);      // Device Type, 1 = FFD , 0 = RFD ; cf. https://fr.wikipedia.org/wiki/IEEE_802.15.4
		rep.mainsPowerSource = !!(rep.mac & 0x4);        // Power Source, 1 = mains power, 0 = other
		rep.receiverOnWhenIdle = !!(rep.mac & 0x8);      // Receiver on when Idle, 1 = non-sleepy, 0 = sleepy
		var reserved = !!(rep.mac & 0x48);               // Reserved
		rep.securityCapability = !!(rep.mac & 0x64);     // Security capacity, always 0 (standard security)
		rep.allocateAddress = !!(rep.mac & 0x128);       // 1 = joining device must be issued network address
	},
};
