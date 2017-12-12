module.exports = {
	id: 0x0140,
	name: "attribute_discovery_request",

	build: function(options, cmd) {
		if (isNaN(parseInt(options.target))) throw new Error("invalid mandatory parameter 'target'.");
		if (isNaN(parseInt(options.dstEndpoint))) throw new Error("invalid mandatory parameter 'dstEndpoint'.");
		if (isNaN(parseInt(options.cluster))) throw new Error("invalid mandatory parameter 'cluster'.");
		if (options.manufacturerSpecific && isNaN(parseInt(options.manufacturer))) throw new Error("invalid mandatory parameter 'manufacturerSpecific'.");
		
		options.srcEndpoint = options.srcEndpoint ||0x01; // the zigbee key's endpoint itself ?
		
		options.firstAttributeId = options.firstAttributeId ||0x0000;
		options.clientToServer = (options.serverToClient) ? false : (typeof(options.clientToServer) === 'undefined' ? true : options.clientToServer);
		options.manufacturerSpecific = options.manufacturerSpecific || false;
		options.manufacturer = (options.manufacturerSpecific && options.manufacturer) || 0;
		options.maxCount = options.maxCount || 0xFF;

		cmd.payload = Buffer.alloc(14);
		cmd.payload.writeUInt8(2, 0); // short address mode
		cmd.payload.writeUInt16BE(options.target, 1);
		cmd.payload.writeUInt8(options.srcEndpoint, 3);
		cmd.payload.writeUInt8(options.dstEndpoint, 4);
		cmd.payload.writeUInt16BE(options.cluster, 5);
		cmd.payload.writeUInt16BE(options.attribute, 7);
		cmd.payload.writeUInt8((options.clientToServer ? 0 : 1), 9);
		cmd.payload.writeUInt8((options.manufacturerSpecific ? 1 : 0), 10);
		cmd.payload.writeUInt16BE(options.manufacturer || 0, 11);
		cmd.payload.writeUInt8(options.maxCount || 0, 13);

		return cmd;
	},
};


/*
	https://www.nxp.com/docs/en/user-guide/JN-UG-3103.pdf
	PDF page 750
	
	SendDiscoverAttributesRequest(
		u8SourceEndPointId						Number of the local endpoint through which the request will be sent
		u8DestinationEndPointId				Number of the remote endpoint to which the request will be sent
		u16ClusterId									Identifier of the cluster to be queried (see the macros section in the cluster header file)
		bDirectionIsServerToClient		Direction of request:  TRUE: Cluster server to client  FALSE: Cluster client to server
		psDestinationAddress				  the address of the remote node to which the request will be sent
		pu8TransactionSequenceNumber  the Transaction Sequence Number (TSN) of the request 
		u16AttributeId                Identifier of ‘start’ attribute of interest
		bIsManufacturerSpecific       whether attributes are manufacturer-specific or as defined in relevant ZigBee profile
		u16ManufacturerCode           ZigBee Alliance code for the manufacturer that defined proprietary attributes 
																	(set to zero if bIsManufacturerSpecific = FALSE)
		u8MaximumNumberOfIdentifiers  maximum number of attributes to report in response
	)
	
*/
