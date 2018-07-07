module.exports = {

	match: function(device) {
		if (device.attribute(1, 0, 5) && device.attribute(1, 0, 5).value === 'lumi.sensor_switch.aq2' ) {
			return 1000;
		}
	},


	actions: {
		test: { exec: (() => { this.log("custom SWITCH_BUTTON test action executed on "+this); }) },
	},

	events: {
		push_x1: { attribute: { id:'0x1 0x6 0x0',    equal:true, args:[1]}  },
		push_x2: { attribute: { id:'0x1 0x6 0x8000',             args:[2]}  },
		push_x3: { attribute: { id:'0x1 0x0 0xFF01',             args:[3]}  },
	},

	type_add: function(device) {
	},
	
	type_remove: function(device) {
	},

};
