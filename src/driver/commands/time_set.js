const Enum = require('../enum.js');
const TIME_BASE = new Date('2000-01-01 00:00:00Z').getTime();

module.exports = {
	id: 0x0016,
	name: "time_set",
	statusExpected: true,
	responseExpected: false,
	minVersion: 783, // 3.0a = 778  ;  3.0d = 781  ;  3.0f = 783  ;  3.1a = 794

	build: function(options, cmd, version) {
		if (options.time && !(isNaN(parseInt(options.time))) ) {
			cmd.time = new Date(parseInt(options.time));
		}
		else if (options.time && (options.time instanceof Date)) {
			cmd.time = options.time;
		}
		else if (!options.time) {
			cmd.time = Date.now();
		}

		cmd.timestamp = parseInt( (cmd.time.getTime()-TIME_BASE) / 1000) ;

		cmd.payload = Buffer.alloc(4);
		cmd.payload.writeUInt32( cmd.timestamp );
		return cmd;
	},
};
