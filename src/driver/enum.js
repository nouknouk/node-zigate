const util = require('util');
const colors = require('colors');

Enum = {};

Enum.create = function(enumsetname, definitions) {

	var byKeys = new Map();
	var byNames = new Map();

	var enumSet = function(key, fallbackValue) {
		if (key && typeof(key) === 'object' && (typeof(key.id) !=='undefined')  && (typeof(key.name) ==='string')) {
			return key;
		}
		else {
			if (!isNaN(parseInt(key))) {
				let e = byKeys.get(parseInt(key));
				if (e) return e;
			}
			else {
				let e = byNames.get(""+key);
				if (e) return e;
			}
		}

		// value not found, fallback scenario
		if (fallbackValue instanceof(Error)) {
			throw fallbackValue;
		}
		else if (typeof(fallbackValue) === 'function') {
			return fallbackValue(key);
		}
		else {
			return fallbackValue;
		}
	};
	enumSet.toString = function() { return '[EnumSet_'+enumsetname+']'; };

	enumSet.clear = function() {
		byKeys.clear();
		byNames.clear();
	}
	enumSet.add = function(def) {
		var enumObj = null;
		if (Array.isArray(def) && def.length >=2 && def.length <=3) {
			enumObj = {
				id: def[0],
				name: def[1],
				description: def[2] || undefined,
			};
		}
		else if (def && typeof(def) === 'object' && !isNaN(parseInt(def.id)) && typeof(def.name) === 'string') {
			enumObj = def;
		}
		else {
			throw new Error("invalid enum object definition provided: "+JSON.stringify(def));
		}
		if (byKeys.has(enumObj.id)) {
			throw new Error("cannot add new entry in enum '"+enumsetname+"': colliding identifier '"+enumObj.id+"'");
		}
		else if (byNames.has(enumObj.name)) {
			throw new Error("cannot add new entry in enum '"+enumsetname+"':  colliding name '"+enumObj.name+"'");
		}

		enumObj.toString = /*enumObj.toString ||*/ (() => { return enumObj.name+ ('(0x'+enumObj.id.toString(16)+')').grey; });
		enumObj.inspect = /*enumObj.inspect ||*/ (() => { return enumObj.toString(); });
		byKeys.set(enumObj.id, enumObj);
		byNames.set(enumObj.name, enumObj);
	};

	// end of enumset construction: register (optionally) provided definitions
	if (Array.isArray(definitions)) {
		definitions.forEach(enumSet.add);
	}
	else if (definitions && typeof(definitions) === 'object') {
		for (let n in definitions) {
			var e = definitions[n];

			// array like [id, name, description]
			if (Array.isArray(e) && e.length >= 2 && !isNaN(parseInt(e[0])) && typeof(e[1]) === 'string') {
				enumSet.add(e);
			}

			// literal object like { 0: "name1", 1:"name2", ...}
			else if (typeof(e) === 'string' && !isNaN(parseInt(n))) {
				enumSet.add({id:n, name:e});
			}
			// literal object like { "name1": int_1, "name2": int_2, ...}
			else if (!isNaN(parseInt(e)) && typeof(n) === 'string') {
				enumSet.add({id:e, name:n});
			}
			else if (e && typeof(e) === 'object') {
				// list of objects with (id & name), or (name) only + key being an integer
				if (typeof(e.name) === 'string' && (!isNaN(parseInt(e.id)) || !isNaN(parseInt(n))) ) {
					e.id = (!isNaN(parseInt(e.id))) ? parseInt(e.id) : parseInt(n);
					enumSet.add(e);
				}
				// list of objects with (id) only + key being a string
				else if (e && typeof(e) === 'object' && typeof(n) === 'string' && !isNaN(parseInt(e.id))) {
					e.name = n;
					enumSet.add(e);
				}
			}
		}
	}

	Enum[enumsetname] = enumSet;
	return enumSet;
};


Enum.create('STATUS', [
	[0, "success", ],
	[1, "invalid_params", ],
	[2, "unhandled_command", ],
	[3, "command_failed", ],
	[4, "busy", "Node is carrying out a lengthy operation and is currently unable to handle the incoming command"],
	[5, "stack_already started", "Stack already started (no new configuration accepted)"],
]);

Enum.create('ZCL_STATUS', [
	[ 0, 'success',                                  ],
	[ 1, 'fail',                                     ],
	[ 2, 'parameter_null',                           ],
	[ 3, 'parameter_range',                          ],
	[ 4, 'heap_fail',                                ],
	[ 5, 'ep_range',                                 "endpoint number was out-of-range", ],
	[ 6, 'ep_unknown',                               "endpoint has not been registered with the ZCL (but endpoint number was in-range)", ],
	[ 7, 'security_range',                           ],
	[ 8, 'cluster_0',                                "Specified endpoint has no clusters", ],
	[ 9, 'cluster_null',                             ],
	[10, 'cluster_not_found',                        "cluster has not been registered with the ZCL", ],
	[11, 'cluster_id_range',                         ],
	[12, 'attributes_null',                          ],
	[13, 'attributes_0',                             "list of attributes to be read was empty", ],
	[14, 'attribute_wo',                             ],
	[15, 'attribute_ro',                             ],
	[16, 'attributes_access',                        ],
	[17, 'attribute_type_unsupported',               ],
	[18, 'attribute_not_found',                      ],
	[19, 'callback_null',                            ],
	[20, 'zbuffer_fail',                             "No buffer available to transmit message", ],
	[21, 'ztransmit_fail',                           "ZigBee PRO stack has reported a transmission error", ],
	[22, 'client_server_status',                     ],
	[23, 'timer_resource',                           ],
	[24, 'attribute_is_client',                      "Attempt made by a cluster client to read a client attribute", ],
	[25, 'attribute_is_server',                      "Attempt made by a cluster server to read a server attribute  ", ],
	[26, 'attribute_range',                          ],
	[27, 'attribute_mismatch',                       ],
	[28, 'key_establishment_more_than_one_cluster',  "Cluster that requires application-level (APS) security has been accessed using a packet that has not been encrypted with the application link key", ],
	[29, 'insufficient_space',                       ],
	[30, 'no_reportable_change',                     ],
	[31, 'no_report_entries',                        ],
	[32, 'attribute_not_reportable',                 ],
	[33, 'attribute_id_order',                       ],
	[34, 'malformed_message',                        ],
	[35, 'manufacturer_specific',                    ],
	[36, 'profile_id',                               ],
	[37, 'invalid_value',                            ],
	[38, 'cert_not_found',                           ],
	[39, 'custom_data_null',                         ],
	[40, 'time_not_synchronised',                    ],
	[41, 'signature_verify_failed',                  ],
	[42, 'zreceive_fail',                            ],
	[43, 'key_establishment_end_point_not_found',    ],
	[44, 'key_establishment_cluster_entry_not_found',],
	[45, 'key_establishment_callback_error',         ],
	[46, 'security_insufficient_for_cluster',        ],
	[47, 'custom_command_handler_null_or_returned_error',],
	[48, 'invalid_image_size',                       ],
	[49, 'invalid_image_version',                    ],
	[50, '_attr_req_not_finished',                   ],
	[51, '_attribute_access',                        ],
	[52, 'security_fail',                            ],
	[53, 'cluster_command_not_found',                ],
]);

Enum.create('ATTRIBUTE_TYPE', [
	[0x00, 'null',        ],
	[0x08, 'data8',       ],
	[0x09, 'data16',      ],
	[0x0A, 'data24',      ],
	[0x0B, 'data32',      ],
	[0x0C, 'data40',      ],
	[0x0D, 'data48',      ],
	[0x0E, 'data56',      ],
	[0x0F, 'data64',      ],
	[0x10, 'boolean',     ],
	[0x18, 'bitmap8',     ],
	[0x19, 'bitmap16',    ],
	[0x1A, 'bitmap24',    ],
	[0x1B, 'bitmap32',    ],
	[0x1C, 'bitmap40',    ],
	[0x1D, 'bitmap48',    ],
	[0x1E, 'bitmap56',    ],
	[0x1F, 'bitmap64',    ],
	[0x20, 'uint8',       ],
	[0x21, 'uint16',      ],
	[0x22, 'uint24',      ],
	[0x23, 'uint32',      ],
	[0x24, 'uint40',      ],
	[0x25, 'uint48',      ],
	[0x26, 'uint56',      ],
	[0x27, 'uint64',      ],
	[0x28, 'int8',        ],
	[0x29, 'int16',       ],
	[0x2a, 'int32',       ],
	[0x30, 'enum8',       ],
	[0x31, 'enum16',      ],
	[0x38, 'semiPrec',    ],
	[0x39, 'singlePrec',  ],
	[0x3A, 'doublePrec',  ],
	[0x41, 'bstring',     ], // octetStr
	[0x42, 'string',      ], // charStr
	[0x43, 'lbstring',    ], // longOctetStr
	[0x44, 'lstring',     ], // longCharStr
	[0x48, 'array',       ],
	[0x4C, 'struct',      ],
	[0x50, 'set',         ],
	[0x51, 'bag',         ],
	[0xE0, 'time',        ],
	[0xE1, 'date',        ],
	[0xE2, 'utc',         ],
	[0xE9, 'attrId',      ],
	[0xF0, 'ieee',        ],
	[0xF1, 'seckey',      ],
	[0xFF, 'unknown',     ],
]);

/* teZCL_CommandStatus */
Enum.create('COMMAND_STATUS', [
	[0x00, 'success',                      'Command was successful'],
	[0x01, 'failure',                      'Command was unsuccessful'],
	[0x7e, 'not_authorized',               'Sender does not have authorisation to issue the command'],
	[0x7f, 'reserved_field_not_zero',      'A reserved field of command is not set to zero'],
	[0x80, 'malformed_command',            'Command has missing fields or invalid field values'],
	[0x81, 'unsup_cluster_command',        'The specified cluster has not been registered with the ZCL on the device'],
	[0x82, 'unsup_general_command',        'Command does not have a handler enabled in the zcl_options.h file'],
	[0x83, 'unsup_manuf_cluster_command',  'Manufacturer-specific cluster command is not supported or has unknown manufacturer code'],
	[0x84, 'unsup_manuf_general_command',  'Manufacturer-specific ZCL command is not supported or has unknown manufacturer code'],
	[0x85, 'invalid_field',                'Command has field which contains invalid value'],
	[0x86, 'unsupported_attribute',        'Specified attribute is not supported on the device'],
	[0x87, 'invalid_value',                'Specified attribute value is out of range or a reserved value'],
	[0x88, 'read_only',                    'Attempt to write to read-only attribute'],
	[0x89, 'insufficient_space',           'Not enough memory space to perform requested operation'],
	[0x8A, 'duplicate_exists',             'Attempt made to create a table entry that already exists in the target table'],
	[0x8B, 'not_found',                    'Requested information cannot be found'],
	[0x8C, 'unreportable_attribute',       'Periodic reports cannot be produced for this attribute'],
	[0x8D, 'invalid_data_type',            'Invalid data type specified for attribute'],
	[0x8E, 'invalid_selector',             'Incorrect selector for this attribute'],
	[0x8F, 'write_only',                   'Issuer of command does not have authorisation to read specified attribute'],
	[0x90, 'inconsistent_startup_state',   'Setting the specified values would put device into an inconsistent state on start-up'],
	[0x91, 'defined_out_of_band',          'Attempt has been made to write to attribute using an out-of-band method or not over-air'],
	[0x92, 'inconsistent',                 ''],
	[0x93, 'action_denied',                ''],
	[0x94, 'timeout',                      ''],
	[0xc0, 'hardware_failure',             'Command was unsuccessful due to hardware failure'],
	[0xc1, 'software_failure',             'Command was unsuccessful due to software failure'],
	[0xc2, 'calibration_error',            ''],
	[0xc3, 'unsupported_cluster',          ''],
]);

Enum.create('READ_WRITE_ATTRIBUTE_STATUS', [
	[0x07, 'bad_length', 'zero attributes request or bad count in frame fields'],
	[0x01, 'network_down', "Invalid Call, the network is down or the application is not joined to a network"],
	[0x02, 'invalid_data', "Tried to read more than 15 attributes"],
	[0x0C, 'not_enough_memory', 'Insufficient Memory, there is not enough available memory to transmit the message'],
	[0x00, 'success', 'the message was successfully transmitted'],
	[0xFF, 'fail_unknown', 'Unknown Failure'],
]);

Enum.create('PROFILES', [
 [0x0104, 'ha','ZigBee HA'],
 [0x0105, 'ba',''],
 [0x0107, 'hc',''],
 [0x0108, 'ts',''],
 [0x0109, 'se',''],
 [0x010A, 'rs',''],
 [0xC05E, 'll',''],
]);

Enum.create('PERMIT_JOIN_STATUS', [
	[1, 'on',   'devices are allowed to join network'],
	[0, 'off', 'devices are not allowed join the network'],
]);
Enum.create('RESTART_STATUS', [
	[0, 'startup',   ''],
	[2, 'nfn_start', ''],
	[6, 'running',   ''],
]);

Enum.create('LOG_LEVEL', [
	[0, "emergency",   ''],
	[1, "alert",       ''],
	[2, "critical",    ''],
	[3, "error",       ''],
	[4, "warning",     ''],
	[5, "notice",      ''],
	[6, "information", ''],
	[7, "debug",       ''],
]);

Enum.create('DIRECTION', [
	[0, "srv_to_cli", 'server to client <=> read a value'],
	[1, "cli_to_srv", 'client to server <=> write a value'],
]);

Enum.create('NETWORK_JOIN_STATUS', [
	[0, 'joined_existing_network',     ''],
	[1, 'formed_new_network',          ''],
]);
for (var i=128; i<=244; ++i) Enum.NETWORK_JOIN_STATUS.add([i, 'failed_'+i, 'network join failed (error 0x'+i.toString(16)+')']);

Enum.create('NODE_LOGICAL_TYPE', [
	[0x00, 'coordinator', ''],
	[0x01, 'router',      ''],
	[0x02, 'end_device',  ''],
]);

Enum.create('ADDRESS_MODE', [
    [ 0, 'bound',                        'Use one or more bound nodes/endpoints, with acknowledgements'],
    [ 1, 'group',                        'Use a pre-defined group address, with acknowledgements'],
    [ 2, 'short',                        'Use a 16-bit network address, with acknowledgements'],
    [ 3, 'ieee',                         'Use a 64-bit IEEE/MAC address, with acknowledgements'],
    [ 4, 'broadcast',                    'Perform a broadcast'],
    [ 5, 'no_transmit',                  'Do not transmit'],
    [ 6, 'bound_no_ack',                 'Perform a bound transmission, with no acknowledgements'],
    [ 7, 'short_no_ack',                 'Perform a transmission using a 16-bit network address, with no acknowledgements'],
    [ 8, 'ieee_no_ack',                  'Perform a transmission using a 64-bit IEEE/MAC address, with no acknowledgements'],
    [ 9, 'bound_non_blocking',           'Perform a non-blocking bound transmission, with acknowledgements '],
    [10, 'bound_non_blocking_no_ack',    'Perform a non-blocking bound transmission, with no acknowledgements '],
]);

Enum.create('DEVICE_TYPE', [
	[ 0, 'coordinator'    , ''],
	[ 1, 'router'         , ''],
	[ 2, 'legacy_router'  , ''],
]);

Enum.create('DEVICE_HA_TYPE', [
	[0x0000, 'On/Off Switch'],
	[0x0001, 'Level Control Switch'],
	[0x0002, 'On/Off Output'],
	[0x0003, 'Level Controllable Output'],
	[0x0004, 'Scene Selector'],
	[0x0005, 'Configuration Tool'],
	[0x0006, 'Remote Control'],
	[0x0007, 'Combined Interface'],
	[0x0008, 'Range Extender'],
	[0x0009, 'Mains Power Outlet'],
	[0x000A, 'Door Lock'],
	[0x000B, 'Door Lock Controller'],
	[0x000C, 'Simple Sensor'],
	[0x0100, 'On/Off Light'],
	[0x0101, 'Dimmable Light'],
	[0x0102, 'Color Dimmable Light'],
	[0x0103, 'On/Off Light Switch'],
	[0x0104, 'Dimmer Switch'],
	[0x0105, 'Color Dimmer Switch'],
	[0x0106, 'Light Sensor'],
	[0x0107, 'Occupancy Sensor'],
	[0x0200, 'Shade'],
	[0x0201, 'Shade Controller'],
	[0x0202, 'Window Covering Device'],
	[0x0203, 'Window Covering Controller'],
	[0x0300, 'Heating/Cooling Unit'],
	[0x0301, 'Thermostat'],
	[0x0302, 'Temperature Sensor'],
	[0x0303, 'Pump'],
	[0x0304, 'Pump Controller'],
	[0x0305, 'Pressure Sensor'],
	[0x0306, 'Flow Sensor'],
	[0x0400, 'IAS Control and Indicating Equipment'],
	[0x0401, 'IAS Ancillary Control Equipment'],
	[0x0402, 'IAS Zone'],
	[0x0403, 'IAS Warning Device'],
	[0x5f01, 'unknown'],

]);


Enum.create('CLUSTERS', require('./clusterDefinitions.js'));


module.exports = Enum;
