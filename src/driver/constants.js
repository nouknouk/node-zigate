const util = require('util');
const colors = require('colors');

function createEnumSet(name, defArray) {
	
	var enumSet = function(key, fallbackValue) {
		if (typeof(key) === 'object' && key && (typeof(key.desc)==='string')) {
			return key;
		}
		else if (typeof(key) === 'number' && typeof(enumSet[key]) === 'object') {
			return enumSet[key];
		}
		else {
			for (var k in enumSet) {
				if (enumSet[''+k].name == ''+key) {
					return enumSet[''+k];
				}
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
	
	enumSet.toString = function() { return '[EnumSet_'+name+']'; };

	enumSet.__add = function(def) {
		var id = def[0];
		var name = def[1];
		var description = def[2] || '';
		
		enumSet[id] = {
			id: id,
			name: name,
			description: description,
			toString: function() { return this.name+ ('(0x'+this.id.toString(16)+')').grey; },
			inspect: function() { return this.toString(); },
		};
	};
	
	defArray.forEach(enumSet.__add);

	return enumSet;
}
Enum = {};

Enum.STATUS = createEnumSet('STATUS', [
	[0, "success", ],
	[1, "invalid_params", ],
	[2, "unhandled_command", ],
	[3, "command_failed", ],
	[4, "busy", "Node is carrying out a lengthy operation and is currently unable to handle the incoming command"],
	[5, "stack_already started", "Stack already started (no new configuration accepted)"],
]);

Enum.ZCL_STATUS = createEnumSet('ZCL_STATUS', [
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

Enum.ATTRIBUTE_TYPE = createEnumSet('ATTRIBUTE_TYPE', [
	[0x00, 'null',    ],
	[0x10, 'boolean', ],
	[0x18, 'bitmap8', ],
	[0x20, 'uint8',   ],
	[0x21, 'uint16',  ],
	[0x22, 'uint32',  ],
	[0x25, 'uint48',  ],
	[0x28, 'int8',    ],
	[0x29, 'int16',   ],
	[0x2a, 'int32',   ],
	[0x30, 'enum',    ],
	[0x42, 'string',  ],
]);

// (teZCL_ReportAttributeStatus)
Enum.ATTRIBUTE_STATUS = createEnumSet('ATTRIBUTE_STATUS', [
	[0x00, 'report_ok',              'report is valid'],
	[0x01, 'report_ep_mismatch',     'source endpoint does not match endpoint in mirror'],
	[0x02, 'report_addr_mismatch',   'source address does not match address in mirror'],
	[0x03, 'report_err',             'there is an error in the report'],
]);


/* teZCL_CommandStatus */
Enum.COMMAND_STATUS = createEnumSet('COMMAND_STATUS', [
	[0x00, 'cmds_success',                      'Command was successful'],
	[0x01, 'cmds_failure',                      'Command was unsuccessful'],
	[0x7e, 'cmds_not_authorized',               'Sender does not have authorisation to issue the command'],
	[0x7f, 'cmds_reserved_field_not_zero',      'A reserved field of command is not set to zero'],
	[0x80, 'cmds_malformed_command',            'Command has missing fields or invalid field values'],
	[0x81, 'cmds_unsup_cluster_command',        'The specified cluster has not been registered with the ZCL on the device'],
	[0x82, 'cmds_unsup_general_command',        'Command does not have a handler enabled in the zcl_options.h file'],
	[0x83, 'cmds_unsup_manuf_cluster_command',  'Manufacturer-specific cluster command is not supported or has unknown manufacturer code'],
	[0x84, 'cmds_unsup_manuf_general_command',  'Manufacturer-specific ZCL command is not supported or has unknown manufacturer code'],
	[0x85, 'cmds_invalid_field',                'Command has field which contains invalid value'],
	[0x86, 'cmds_unsupported_attribute',        'Specified attribute is not supported on the device'],
	[0x87, 'cmds_invalid_value',                'Specified attribute value is out of range or a reserved value'],
	[0x88, 'cmds_read_only',                    'Attempt to write to read-only attribute'],
	[0x89, 'cmds_insufficient_space',           'Not enough memory space to perform requested operation'],
	[0x8A, 'cmds_duplicate_exists',             'Attempt made to create a table entry that already exists in the target table'],
	[0x8B, 'cmds_not_found',                    'Requested information cannot be found'],
	[0x8C, 'cmds_unreportable_attribute',       'Periodic reports cannot be produced for this attribute'],
	[0x8D, 'cmds_invalid_data_type',            'Invalid data type specified for attribute'],
	[0x8E, 'cmds_invalid_selector',             'Incorrect selector for this attribute'],
	[0x8F, 'cmds_write_only',                   'Issuer of command does not have authorisation to read specified attribute'],
	[0x90, 'cmds_inconsistent_startup_state',   'Setting the specified values would put device into an inconsistent state on start-up'],
	[0x91, 'cmds_defined_out_of_band',          'Attempt has been made to write to attribute using an out-of-band method or not over-air'],
	[0x92, 'cmds_inconsistent',                 ''],
	[0x93, 'cmds_action_denied',                ''],
	[0x94, 'cmds_timeout',                      ''],
	[0xc0, 'cmds_hardware_failure',             'Command was unsuccessful due to hardware failure'],
	[0xc1, 'cmds_software_failure',             'Command was unsuccessful due to software failure'],
	[0xc2, 'cmds_calibration_error',            ''],
	[0xc3, 'cmds_unsupported_cluster',          ''],
]);

Enum.PROFILES = createEnumSet('PROFILES', [
 [0x0104, 'ha','ZigBee HA'],
]);

Enum.PERMIT_JOIN_STATUS = createEnumSet('PERMIT_JOIN_STATUS', [
	[0, 'on',   'devices are allowed to join network'],
	[1, 'off', 'devices are not allowed join the network'],
]);
Enum.RESTART_STATUS = createEnumSet('RESTART_STATUS', [
	[0, 'startup',   ''],
	[2, 'nfn_start', ''],
	[6, 'running',   ''],
]);

Enum.LOG_LEVEL = createEnumSet('LOG_LEVEL', [
	[0, "emergency",   ''],
	[1, "alert",       ''],
	[2, "critical",    ''],
	[3, "error",       ''],
	[4, "warning",     ''],
	[5, "notice",      ''],
	[6, "information", ''],
	[7, "debug",       ''],
]);

Enum.DIRECTION = createEnumSet('LOG_LEVEL', [
	[0, "srv_to_cli",  'server to client <=> read a value'],
	[1, "cli_to_srv",  'client to server <=> write a value'],
]);

Enum.NETWORK_JOIN_STATUS = createEnumSet('NETWORK_JOIN_STATUS', [
	[0, 'joined_existing_network', ,''],
	[1, 'formed_new_network',      ,''],
]);
for (var i=128; i<=244; ++i) Enum.NETWORK_JOIN_STATUS.__add([i, 'failed_'+i, 'network join failed (error 0x'+i.toString(16)+')']);

Enum.NODE_LOGICAL_TYPE = createEnumSet('NODE_LOGICAL_TYPE', [
	[0x00, 'coordinator', ''],
	[0x01, 'router',      ''],
	[0x02, 'end_device',  ''],
]);

Enum.ADDRESS_MODE = createEnumSet('ADDRESS_MODE', [
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

Enum.DEVICE_TYPE = createEnumSet('DEVICE_TYPE', [
	[ 0, 'coordinator'    , ''],
	[ 1, 'router'         , ''],
	[ 2, 'legacy_router'  , ''],
]);

Enum.CLUSTERS = createEnumSet('CLUSTERS', [
	[0x0000, 'basic',                   ''], 
	[0x0001, 'power_config',            ''], 
	[0x0002, 'temperature_config',      ''], 
	[0x0003, 'identify',                ''], 
	[0x0004, 'groups',                  ''], 
	[0x0005, 'scenes',                  ''], 
	[0x0006, 'on_off',                  ''], 
	[0x0007, 'on_off_config',           ''], 
	[0x0008, 'level_control',           ''], 
	[0x0009, 'alarms',                  ''], 
	[0x000A, 'time',                    ''], 
	[0x000F, 'binary_input_basic',      ''], 
	[0x0020, 'poll_control',            ''], 
	[0x0019, 'ota',                     ''], 
	[0x0101, 'door_lock',               ''], 
	[0x0201, 'hvac_thermostat',         ''], 
	[0x0202, 'Hhvac_fan_control',       ''], 
	[0x0300, 'lightning_color_control', ''], 
	[0x0400, 'measurement_illuminance', ''], 
	[0x0402, 'measurement_temperature', ''], 
	[0x0403, 'measurement_pressure',    ''], 
	[0x0405, 'measurement_humidity',    ''], 
	[0x0406, 'measurement_occupancy',   ''], 
	[0x0500, 'ias_zone',                ''], 
	[0x0702, 'energy_meter',            ''], 
	[0x0B05, 'misc_diagnostics',        ''], 
	[0x1000, 'zll',                     ''], 
	[0xFF01, 'xiaomi_private_1',        ''], 
	[0xFF02, 'xiaomi_private_2',        ''], 
	[0x1234, 'xiaomi_private_3',        ''], 
]);
/*
for (let i=0; i<=0xffff; ++i) {
	if (!Enum.CLUSTERS(i)) {
		Enum.CLUSTERS.__add([i, 'unknown', 'unknown cluster 0x'+i.toString(16)])
	}
}
*/

Enum.COMMANDS = createEnumSet('COMMANDS', [
]);
Enum.RESPONSES = createEnumSet('RESPONSES', [
]);

module.exports = Enum;
