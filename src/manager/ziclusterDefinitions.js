Definitions = {
};


Definitions.register = function(clusterDef) {
  this[clusterDef.id] = clusterDef;
};

Definitions.getClusterDef = function(clusterId) {
  return this[clusterId] || null;
};
Definitions.getAttributeDef = function(clusterId, attributeId) {
  var cluster = this.getClusterDef(clusterId);
  if (cluster) {
    return cluster.properties[attributeId] || null;
  }
};


Definitions.register({
  id: 0x0000,
  name:'basic',
  properties: {
    0x0000: { id: 0x0000, name: 'zcl_version',         type:'uint8', read: true, write:false, default: 0x00, mandatory: true },
    0x0001: { id: 0x0001, name: 'application_version', type:'uint8', read: true, write:false, default: 0x00, mandatory: false },
    0x0002: { id: 0x0002, name: 'stack_version',       type:'uint8', read: true, write:false, default: 0x00, mandatory: false },
    0x0003: { id: 0x0003, name: 'hw_version',          type:'uint8', read: true, write:false, default: 0x00, mandatory: false },
    0x0004: { id: 0x0004, name: 'manufacturer_name',   type:'string', read: true, write:false, default: '', mandatory: false },
    0x0005: { id: 0x0005, name: 'model_identifier',    type:'string', read: true, write:false, default: '', mandatory: false },
    0x0006: { id: 0x0006, name: 'date_code',           type:'string', read: true, write:false, default: '', mandatory: false },
    0x0007: { id: 0x0007, name: 'power_source',        type:'enum8', read: true, write:false, default: 0x00, mandatory: true },
  },
});
Definitions.register({
  id: 0x0001,
  name:'power_configuration',
  properties: {
    0x0000: { id: 0x0000, name: 'mains_voltage',       type:'uint16', read: true, write:false, default: null, mandatory: false, unit:'100mV' },
    0x0001: { id: 0x0001, name: 'mains_frequency',     type:'uint8',  read: true, write:false, default: null, mandatory: false, unit:'2Hz' },
    0x0010: { id: 0x0010, name: 'mains_alarm_mask',    type:'bitmap8',  read: true, write:true, default: 0, mandatory: false },
    0x0011: { id: 0x0011, name: 'mains_voltage_min_threshold', type:'uint16',  read: true, write:true, default: 0, mandatory: false, unit:'100mV' },
    0x0012: { id: 0x0012, name: 'mains_voltage_max_threshold', type:'uint16',  read: true, write:true, default: 0xffff, mandatory: false, unit:'100mV' },
    0x0013: { id: 0x0013, name: 'mains_voltage_dwell_trip_point', type:'uint16',  read: true, write:true, default: 0, mandatory: false, unit:'100mV' },
    0x0020: { id: 0x0020, name: 'battery_voltage', type:'uint8',  read: true, write:false, default: null, mandatory: false, unit:'100mV' },
    0x0034: { id: 0x0034, name: 'battery_rated_voltage', type:'uint8',  read: true, write:true, default: null, mandatory: false, unit:'100mV' },
  }
});
Definitions.register({
  id: 0x0002,
  name:'temperature_configuration',
  properties: {}
});
Definitions.register({
  id: 0x0003,
  name:'identify',
  properties: {}
});
Definitions.register({
  id: 0x0004,
  name:'groups',
  properties: {}
});
Definitions.register({
  id: 0x0005,
  name:'scenes',
  properties: {}
});
Definitions.register({
  id: 0x0006,
  name:'on_off',
  properties: {}
});
Definitions.register({
  id: 0x0007,
  name:'on_off_switch_configuration',
  properties: {}
});
Definitions.register({
  id: 0x0008,
  name:'level_control',
  properties: {}
});
Definitions.register({
  id: 0x0009,
  name:'alarms',
  properties: {}
});
Definitions.register({
  id: 0x000A,
  name:'time',
  properties: {}
});
Definitions.register({
  id: 0x000F,
  name:'binary_input_basic',
  properties: {}
});
Definitions.register({
  id: 0x0019,
  name:'ota',
  properties: {}
});
Definitions.register({
  id: 0x0020,
  name:'poll_control',
  properties: {}
});

Definitions.register({
  id: 0x0101,
  name:'door_lock',
  properties: {}
});

Definitions.register({
  id: 0x0201,
  name:'thermostat',
  properties: {
    0x0000: { id: 0x0000, name: 'local_temperature', type:'int16',  read: true, write:false, default: null, mandatory: true, unit:'0.01°C' },
    0x0001: { id: 0x0001, name: 'outdoor_temperature', type:'int16',  read: true, write:false, default: null, mandatory: false, unit:'0.01°C' },
    0x0002: { id: 0x0002, name: 'occupancy', type:'bitmap8',  read: true, write:false, default: 0, mandatory: false },
    0x0003: { id: 0x0003, name: 'abs_min_heat_setpoint_limit', type:'int16',  read: true, write:false, default: 0x02bc, mandatory: false },
    0x0004: { id: 0x0004, name: 'abs_max_heat_setpoint_limit', type:'int16',  read: true, write:false, default: 0x0bb8, mandatory: false },
    0x0011: { id: 0x0011, name: 'occupied_cooling_setpoint', type:'int16',  read: true, write:true, default: 0x0a28, mandatory: true },
    0x0012: { id: 0x0012, name: 'occupied_heating_setpoint', type:'int16',  read: true, write:true, default: 0x07d0, mandatory: true },
    0x001b: { id: 0x001b, name: 'control_sequence_of_operation', type:'enum8',  read: true, write:false, default: 0x04, mandatory: true },
    0x001c: { id: 0x001c, name: 'system_mode', type:'enum8',  read: true, write:false, default: 0x02, mandatory: true },
  }
});

Definitions.register({
  id: 0x0202,
  name:'fan_control',
  properties: {}
});

Definitions.register({
  id: 0x0300,
  name:'color_control',
  properties: {}
});

Definitions.register({
  id: 0x0400,
  name:'illuminance_measurement',
  properties: {
    0x0000: { id: 0x0000, name: 'measured_value',     type:'uint16',  read: true, write:false, default: 0, mandatory: true, unit:'lux' },
    0x0001: { id: 0x0001, name: 'min_measured_value', type:'uint16',  read: true, write:false, default: null, mandatory: true, unit:'lux' },
    0x0002: { id: 0x0002, name: 'max_measured_value', type:'uint16',  read: true, write:false, default: null, mandatory: true, unit:'lux' },
    0x0003: { id: 0x0003, name: 'tolerance',          type:'uint16',   read: true, write:false, default: null, mandatory: false, unit:'lux' },
    0x0004: { id: 0x0004, name: 'light_sensor_type',  type:'enum8',   read: true, write:false, default: null, mandatory: false, values:{0:'photodiode',1:'CMOS'} },
  }
});
Definitions.register({
  id: 0x0402,
  name:'temperature_measurement',
  properties: {
    0x0000: { id: 0x0000, name: 'measured_value',     type:'int16',  read: true, write:false, default: 0, mandatory: true, unit:'0.01°C' },
    0x0001: { id: 0x0001, name: 'min_measured_value', type:'int16',  read: true, write:false, default: null, mandatory: true, unit:'0.01°C' },
    0x0002: { id: 0x0002, name: 'max_measured_value', type:'int16',  read: true, write:false, default: null, mandatory: true, unit:'0.01°C' },
    0x0003: { id: 0x0003, name: 'tolerance',          type:'uint16',   read: true, write:false, default: null, mandatory: false, unit:'0.01°C' },
  }
});
Definitions.register({
  id: 0x0403,
  name:'pressure_measurement',
  properties: {
    0x0000: { id: 0x0000, name: 'measured_value',     type:'int16',  read: true, write:false, default: 0, mandatory: true, unit:'0.1kPa' },
    0x0001: { id: 0x0001, name: 'min_measured_value', type:'int16',  read: true, write:false, default: null, mandatory: true, unit:'0.1kPa' },
    0x0002: { id: 0x0002, name: 'max_measured_value', type:'int16',  read: true, write:false, default: null, mandatory: true, unit:'0.1kPa' },
    0x0014: { id: 0x0010, name: 'xiaomi_value',       type:'int16',   read: true, write:false, default: null, mandatory: false, unit:'0.1kPa' },
  }
});
Definitions.register({
  id: 0x0405,
  name:'relative_humidity_measurement',
  properties: {
    0x0000: { id: 0x0000, name: 'measured_value', type:'uint16',     read: true, write:false, default: null, mandatory: true, unit:'0.01%' },
    0x0001: { id: 0x0001, name: 'min_measured_value', type:'uint16', read: true, write:false, default: null, mandatory: true, unit:'0.01%' },
    0x0002: { id: 0x0002, name: 'max_measured_value', type:'uint16', read: true, write:false, default: null, mandatory: true },
    0x0003: { id: 0x0003, name: 'tolerance', type:'uint16',          read: true, write:false, default: null, mandatory: false },
  }
});
Definitions.register({
  id: 0x0406,
  name:'occupancy_sensing',
  properties: {}
});
Definitions.register({
  id: 0x0500,
  name:'ias_zone',
  properties: {}
});

Definitions.register({
  id: 0x0702,
  name:'smart_energy_metering',
  properties: {}
});

Definitions.register({
  id: 0x0B05,
  name:'diagnostics',
  properties: {}
});

Definitions.register({
  id: 0x1000,
  name:'zll_commissioning',
  properties: {}
});

Definitions.register({
  id: 0xFF01,
  name:'xiaomi_private_1',
  properties: {}
});
Definitions.register({
  id: 0xFF02,
  name:'xiaomi_private_2',
  properties: {}
});


module.exports = Definitions;
