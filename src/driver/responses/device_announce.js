module.exports = {
	id: 0x004D,
	name: "device_announce",


	parse: function(reader, rep, version) {
		rep.address = reader.nextUInt16BE();
		rep.ieee = reader.nextBuffer(8).toString('hex');
		rep.mac = reader.nextUInt8();

		rep.alternatePanCoordinator = !!(rep.mac & 0b00000001);      // bit 0: Alternative PAN Coordinator, always 0
		rep.fullFunctionDevice = !!(rep.mac &      0b00000010);      // bit 1: Device Type, 1 = FFD , 0 = RFD ; cf. https://fr.wikipedia.org/wiki/IEEE_802.15.4
		rep.mainsPowerSource = !!(rep.mac &        0b00000100);      // bit 2: Power Source, 1 = mains power, 0 = other
		rep.receiverOnWhenIdle = !!(rep.mac &      0b00001000);      // bit 3: Receiver on when Idle, 1 = non-sleepy, 0 = sleepy
		rep.reserved = (rep.mac &                  0b00110000) >> 4; // bit 4&5: Reserved
		rep.securityCapability = !!(rep.mac &      0b01000000);      // bit 6: Security capacity, always 0 (standard security)
		rep.allocateAddress = !!(rep.mac &         0b10000000);      // bit 7: 1 = joining device must be issued network address
	},
};
