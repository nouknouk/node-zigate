module.exports = {
	id: 0x0110,
	name: "attribute_write",


	build: function(options, cmd) {
		cmd.addressMode = Enum.ADDRESS_MODE(options.addressMode, Enum.ADDRESS_MODE('short'));
		cmd.address = !(isNaN(parseInt(options.address))) ? parseInt(options.address) : (()=>{throw new Error("invalid parameter 'address'.");})();
		cmd.endpoint = options.endpoint || (()=>{throw new Error("invalid parameter 'dstEndpoint'.")})();
		cmd.endpointSource = options.endpointSource || 0x01; // the zigbee key's endpoint itself ?
		cmd.cluster = Enum.CLUSTERS(options.cluster, new Error("invalid parameter 'cluster'."));
		cmd.direction = Enum.DIRECTION(options.direction, Enum.DIRECTION('cli_to_srv'));
		cmd.manufacturer = cmd.manufacturer || false;
		cmd.attribute = cmd.cluster.attributes[options.attribute] || (()=>{throw new Error("invalid parameter 'attribute'.");})();
		cmd.value = typeof(options.value) !== 'undefined' ? options.value : (()=>{throw new Error("invalid parameter 'value'.");})();

		var type = Enum.ATTRIBUTE_TYPE(cmd.attribute.type, new Error("unknown attribute type '"+cmd.attribute.type+"'"));
		var bufvalue = null;
		switch (type.id) {
			case 0x00: // null
				bufvalue = Buffer.alloc(0);
				break;
			case 0x10: // boolean
				bufvalue = Buffer.alloc(1);
				bufvalue.writeUInt8( (cmd.value ? 1 : 0), 0);
				break;
			case 0x18: // bitmap8
				bufvalue = Buffer.alloc(1);
				bufvalue.writeUInt8(cmd.value, 0);
				break;
			case 0x20: // uint8
				bufvalue = Buffer.alloc(1);
				bufvalue.writeUInt8(cmd.value, 0);
				break;
			case 0x21: // uint16
				bufvalue = Buffer.alloc(2);
				bufvalue.writeUInt16BE(cmd.value, 0);
				break;
			case 0x22: // uint32
				bufvalue = Buffer.alloc(4);
				bufvalue.writeUInt32BE(cmd.value, 0);
				break;
			case 0x25: // uint48
				break;
			case 0x28: // int8
				bufvalue = Buffer.alloc(1);
				bufvalue.writeInt8(cmd.value, 0);
				break;
			case 0x29: // int16
				bufvalue = Buffer.alloc(2);
				bufvalue.writeInt16BE(cmd.value, 0);
				break;
			case 0x2a: // int32
				bufvalue = Buffer.alloc(4);
				bufvalue.writeInt32BE(cmd.value, 0);
				break;
			case 0x30: // enum8
				bufvalue = Buffer.alloc(1);
				bufvalue.writeUInt8(cmd.value, 0);
				break;
			case 0x31: // enum16
				bufvalue = Buffer.alloc(2);
				bufvalue.writeUInt16BE(cmd.value, 0);
				break;
			case 0x42: // string
				bufvalue = Buffer.alloc(cmd.value.length+1);
				bufvalue.writeUInt8(cmd.value.length,0);
				for (var i=0; i<cmd.value.length; ++i) {
					bufvalue.writeUInt8(cmd.value.charCodeAt(i), i+1);
				}
				break;
			default:
				throw new Error("unhandled attribute type serialization: "+type);
		}

		cmd.payload = Buffer.alloc(12+3+bufvalue.length);

		cmd.payload.writeUInt8(cmd.addressMode.id, 0); // short address mode
		cmd.payload.writeUInt16BE(cmd.address, 1);
		cmd.payload.writeUInt8(cmd.endpointSource, 3);
		cmd.payload.writeUInt8(cmd.endpoint, 4);
		cmd.payload.writeUInt16BE(cmd.cluster.id, 5);
		cmd.payload.writeUInt8(cmd.direction.id, 7);
		cmd.payload.writeUInt8((cmd.manufacturer ? 1 : 0), 8); /* manufacturer specific */
		cmd.payload.writeUInt16BE(cmd.manufacturer || 0, 9);
		cmd.payload.writeUInt8( 1 /*cmd.attributes.length*/ || 0, 11);

		cmd.payload.writeUInt16BE(cmd.attribute.id || 0, 12);
		bufvalue.copy(cmd.payload, 14);

		return cmd;
	},
};
