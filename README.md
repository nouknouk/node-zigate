# node-zigate

The project aims to provide low & high level APIs for managing the Zigate USB TTL key (cf. zigate.fr) in node.js

__This project is still under active development ; not very usable yet.__

It's mostly for developpers which want to have a look / contribute.


## installation:

For the moment, no npm repository ; fetch directly from git

`npm install git+https://git@github.com/nouknouk/node-zigate.git`

## dependencies

This module depends on node module 'serialport', which is based on a native addon (compiled by node-gyp).
Therefore, some build tools must be present on your machine, to make the installation successfull.



## quick test:
The test sample:
- instanciate the Driver,
- setup the event listeners
- (try to) guess the Zigate port,
- open a connexion to it
- send a command 'get_version'
- wait for the response, display it
- close the connexion.
- exit
```
git clone https://github.com/nouknouk/node-zigate.git
cd node-zigate
npm install
npm test
```

## introduction:

This project is composed of two main parts, representing two level of abstraction of the Zigate key:
* The Zigate.Driver is a 'lower level' abstraction of the Zigate key
* The Zigate.Coordinator, an higher abstraction on top of the Zigate.Driver class ; it provides additionnal features.


## The Zigate.Driver class:

Zigate.Driver is a 'lower level' abstraction of the Zigate key ; it is represented by the 'Driver' class, which manages the connexion to the serial port of the ZiGate and provides utility functions to connect/disconnect to the Zigate key, build & send requests and parse & be notiied of responses.

### instanciation;
```
let Zigate = require('node-zigate');
let myZikey = new Zigate.Driver({
  logger: 'console' // optional: displays debug information to the conosle (by default, no output).
});
```

### connect/disconnect
```
// connect to the Zigate
let port = '/dev/ttyUSB0';
myZikey.open(port, /*optional callback*/);

// be notified when connexion succeeded:
myZikey.on('open', function(err) => {
  if (!err) console.log("connexion started.");
});


// disconnect from the zigate:
if (myZikey.isOpen) {
  myZikey.close();
}

// be notified when connexion has been closed:
myZikey.on('close', function(err) => {
  if (!err) console.log("connexion terminated.");
});
```

### send commands:
A command is composed of a name (like `'get_version'`, `'reset'`, `'permit_join_request'`), and zero or more parameters.
Look for the list of commands available & their parameters in subfolder `src/driver/commands/`
```
// send a command:
myZikey.send('my_command_name', {
  paramFoo: 'foo',
  paramBar: 'bar'
});

// be notified when any command has been sent;
myZikey.on('command', function(cmd) => {
  console.log("I just sent a command via Driver.send('the_command_name')...");
});

// be notified when a particular command has been sent:
myZikey.on('command_cmd_xxx', function(cmd) => {
  console.log("I just sent a command via Driver.send('cmd_xxx')...");
});
```

### receive responses:
Look for the list of responses available & their content in subfolder 'src/driver/responses/'
```
// be notified of any response received:
myZikey.on('response', function(rep) {
  console.log("Response received: ",rep);
});

// be notified when a particular response is received:
myZikey.on('response_yyy', function(rep) => {
  if (!err) console.log("Response 'yyy' received: ",res);
});

```

## The Zigate.Coordinator class:

Zigate.Coordinator is an 'higher level' abstraction of the Zigate key: it handles communication with it by using the Driver class and provides additionnal features:
* expose the availables devices, their endpoints / clusters / attributes and actions on them (get/set attribute's values, ...)
* stores the data to the nodes included in the network in a file, for further loading on next run.
* metadata related to clusters/attributes (names, type of data, ...
* better API to start/stop inclusion mode
* automatic discovering & retrieval of clusters & attributes after an association of a new Zigbee device
* automatic recognition of known devices, and creation of appropriate values, events, actions to interact with the device.

### instanciation;
```
let Zigate = require('node-zigate');
let coord = new Zigate.Coordinator({
  logger: 'console',          // optional: displays debug information to the console (by default, no output).
  loadsavepath: './zigate_data.json', // the file where included devices data is persisted / reloaded
});
```

### start Coordinator
```
coord.start({
  port: '/dev/ttyUSB0' // optional: if no port provided, coordinator will try to guess it.
});
.then(()=> {
  console.log("coordinator started");
});
```

### inclusion of a new device:
```
coord.startInclusion(60 /* time in seconds */);

```

### devices: zigbee raw data:

Get the list of devices:
```
coord.devices.forEach( (device) => {
  console.log("device");
  console.log("    - address: "+device.address+" ("+device.hex+")");
  console.log("    - type: "+device.type);
});
```

* Each device has got [0...n] endpoints
* Each endpoint has got [0...n] clusters
* Each cluster has got [0...n] attributes (which store data)
* Each cluster has got [0...n] commands (to perform actions)

Those endpoints, clusters, attributes, commands are references with their 'id' (a unique number, often written in hexadecimal)

Get the devices data:
```
  coord.devices.forEach( (device) => {
    console.log("device "+device.hex);

    device.endpoints.forEach( (endpoint) => {
        console.log("  endpoint "+endpoint.hex);

        endpoint.clusters.forEach( (cluster) => {
            console.log("    cluster "+cluster.hex);

            cluster.attributes.forEach( (attribute) => {
                console.log("      attribute "+attribute.hex+" type="+JSON.stringify(attribute.type));
            });
            cluster.commands.forEach( (command) => {
                console.log("      command "+command.hex+" type="+JSON.stringify(command.type));
            });
        });
    });
  });
```

#### Getters:

* Get array of all devices / one device by address: `coordinator.devices` / `coordinator.device(0x1234);`
* Get array of all endpoints / one endpoint by id: `device.endpoints` / `device.endpoint(0x0001);`
* Get array of all clusters / one cluster by id: `endpoint.clusters` / `endpoint.cluster(0xff01);`
* Get array of all attributes / one attribute by id: `cluster.attributes` / `cluster.attribute(0x0005);`
* Get array of all commands / one command by id: `cluster.commands` / `cluster.command(0x0001);`

### devices: known models & auto-recognition:

When a device is included in the network, the coordinator may recognize the model of device you just included (like "Xiaomi Aquara temperature sensor"). In such case, it will add specific data to the device instance:

* values, which are (read/write) user-friendly data (like 'temperature', 'presence', 'battery')
* actions, which are functions you can call (__work in progress__)
* events, which may be fired (like 'button pushed', 'motion detected', ...)

To get the list of device model currently supported, look in `devices` folder (one definition file per model).

#### getters:

Same principle as for endpoints:

```
  coord.devices.forEach( (device) => {
    console.log("device "+device.hex);

    device.values.forEach( (value) => {
        console.log("  value "+value.id+" = "+value());
    });

    device.actions.forEach( (action) => {
        console.log("  action "+action.id);
    });

    device.events.forEach( (event) => {
        console.log("  event "+event.id);
    });
  });

  myButtondevice.event('push_x2').on('push_x2', () => {
    console.log("my Xiaomi push button has been double clicked")
  }
```

### Events fired:

catch them like any event in nodejs:
```
coordinator.on('start' function() { /* do something */ })
```

#### by Coordinator:

`starting`, `started`, `stop`, `reset`, `error`, `inclusion_start`, `inclusion_stop`, `device_add`, `device_remove`, `endpoint_add`, `attribute_add`, `attribute_change`, `command_add`, `action_exec`, `event_fire`

#### by a device:

`endpoint_add`, `cluster_add`, `attribute_add`, `attribute_change`, `command_add`, `value_add`, `value_remove`, `value_changed`, `action_add`, `action_remove`, `action_exec`, `event_add`, `event_remove`, `device_remove`

#### by a value:

`value_changed`


#### by an attribute:

`attribute_change`

#### by a command:

`command_exec`
