const STATUS = {
	0: 'joined_existing_network',
	1: 'formed_new_network',
};
for (var i=128; i<=244; ++i) STATUS[i]='failed';

// 01  /  80 24  /  00 0d  /  b3  /  01 00 00 00 15 8d 00 01 b2 2e 15 0b 00

module.exports = {
	id: 0x8024,
	name: "network_joined",
	parse: function(payload, rep) {
		rep.status = payload.readUInt8(0);
		rep.statusText = STATUS[rep.status];
		rep.shortAddress = payload.readUInt16BE(1);
		rep.ieeeAddress = payload.slice(3,11).toString('hex'); // JS doesn't handle 64 bits integers.
		rep.channel = payload.readUInt8(7);
	},
};
