const STATUS = {
	0: 'joined_existing_network',
	1: 'formed_new_network',
};
for (var i=128; i<=244) STATUS[i]='failed';

module.exports = {
	typeid: 0x8014,
	typename: "network_joined",
	parse: function(payload) {
		var rep = {
			type: this.typeid,
		};
		rep.status = payload.readUInt8(0);
		rep.statusText = STATUS[rep.status];
		rep.shortAddress = payload.readUInt16EB(1);
		rep.extendedAddressHI = payload.readUInt32EB(3); // JS doesn't handle 64 bits integers.
		rep.extendedAddressLO = payload.readUInt32EB(5); // JS doesn't handle 64 bits integers.
		rep.channel = payload.readUInt8(7);
		return rep;
	},
};
