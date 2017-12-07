module.exports = {
	id: 0x0049,
	name: "permit_join_request",
	build: function(options, cmd) {
		options.target = options.target || 0xFFFC /*broadcast*/;
		options.duration = options.duration || 60;
		options.significance = options.significance || 0; /* 0 = No change in authentication ; 1 = Authentication policy as spec */
		
		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt16BE(parseInt(options.target), 0);
		cmd.payload.writeUInt8(parseInt(options.duration), 2);
		cmd.payload.writeUInt8(parseInt(options.significance), 3);
		return cmd;
	},
};




/*

Zigate -> Obj 	
0x0049 	
Permit Joining request 	
			<target short address: uint16_t>
			<interval: uint8_t> 	
			<TCsignificance: uint8_t> 	
			Target address: May be address of gateway node or broadcast (0xfffc) 	
			Interval: 	
			0 = Disable Joining 	
			1 – 254 = Time in seconds to allow joins 	
			255 = Allow all joins 	
			TCsignificance: 	
			0 = No change in authentication 	
			1 = Authentication policy as spec


Zigate -> Obj 	
0x0014 	
Permit Join 		


Obj-> ZiGate 	
0x8014 	
“Permit join” status response 	
	<Status: bool_t> 	
			0 – Off 	
			1 – On
			
			Status, followed by “Permit join” status response
*/
