
Zi = require('../');

let coord = new Zi.Coordinator({
	log: 'console',
	port: 'auto',
        loadsavepath: './network_devices.json',
});

coord.start();

