module.exports = {
	id: 0x004D,
	name: "device_announce",
	parse: function(payload, rep) {
		rep.shortAddress = payload.readUInt16BE(0);
		rep.ieeeAddress = payload.slice(2,10).toString('hex');
		rep.mac = payload.readUInt8(10);
		rep.alternatePanCoordinator = !!(rep.mac & 0x1);
		rep.deviceType = !!(rep.mac & 0x2);
		rep.powerSource = !!(rep.mac & 0x4);
		rep.receiverOnWhenIdle = !!(rep.mac & 0x8);
		rep.reserved = !!(rep.mac & 0x48);
		rep.securityCapability = !!(rep.mac & 0x64);
		rep.allocateAddress = !!(rep.mac & 0x128);
	},
};
