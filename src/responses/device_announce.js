module.exports = {
	typeid: 0x8014,
	typename: "device_announce",
	parse: function(payload) {
		var rep = {
			type: this.typeid,
		};
		rep.shortAddress = payload.readUInt16BE(0);
		rep.ieeeAddressHI = payload.readUInt16BE(2);
		rep.ieeeAddressLO = payload.readUInt16BE(4);
		rep.mac = payload.readUInt8(6);
		rep.alternatePanCoordinator = !!(rep.mac & 0x1);
		rep.deviceType = !!(rep.mac & 0x2);
		rep.powerSource = !!(rep.mac & 0x4);
		rep.receiverOnWhenIdle = !!(rep.mac & 0x8);
		rep.reserved = !!(rep.mac & 0x48);
		rep.securityCapability = !!(rep.mac & 0x64);
		rep.allocateAddress = !!(rep.mac & 0x128);

		return rep;
	},
};
