# node-zigate

The project aims to provide low & high level APIs for managing the Zigate USB TTL key (cf. zigate.fr) in node.js

__This project is still under active development ; not very usable yet.__ It's mostly for developpers which want to have a look / contribute.

This project is composed of two main parts, representing two level of abstraction of the Zigate key:

* The Zigate.Driver is a 'lower level' abstraction of the Zigate key ; it manages the connexion to the serial port of the ZiGate and provides utility functions to connect/disconnect to the Zigate key, build & send requests and parse & be notified of responses.

* The Zigate.Coordinator, an higher abstraction on top of the Zigate.Driver class ; it provides additionnal features:

  * uses the Zigate.Driver for low-level interaction with the zigate key.
  * exposes the availables devices, their endpoints / clusters / attributes and actions on them (get/set attribute's values, ...)
  * keeps a trace of the devices included in the network, for persistance on next run.
  * stores metadata related to zigbee devices' specifications: endpoints/clusters/attributes
  * provides a simple API to start/stop the inclusion mode (to include/Exclude a zigbee device in the Zigate's
  * recognizes devices, and creates appropriate values, events, actions objects, to interact easily with the device.


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
npm test/test-driver
```

## documentation:

let's have a look at the [wiki of node-zigate](https://github.com/nouknouk/node-zigate/wiki) !

