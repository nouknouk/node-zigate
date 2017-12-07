module.exports = {
	id: 0x8701,
	name: "router_discovery_confirm",
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.networkStatus = payload.readUInt8(1);
	},
};
