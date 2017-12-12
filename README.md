# node-zigate

The project aims to provide low & high level APIs for managing the Zigate USB TTL key (cf. zigate.fr) in node.js

__This project is still under active development ; not very usable yet.__

It's mostly for developpers which want to have a look / contribute.

## introduction:

This project is composed of two main parts, representing two level of abstraction of the Zigate key:
* The Zigate.Driver is a 'lower level' abstraction of the Zigate key
* The Zigate.Manager, and higher abstraction on top of the Zigate.Driver class ; it would provide additionnal features.


### The Zigate.Driver class:

Zigate.Driver is a 'lower level' abstraction of the Zigate key ; it is represented by the 'Driver' class, which manages the connexion to the serial port of the ZiGate and provides utility functions to connect/disconnect to the Zigate key, build & send requests and parse & be notiied of responses.

#### instanciation;
```
let Zigate = require('node-zigate');
let myZikey = new Zigate.Driver({
  logger: 'console' // optional: displays debug information to the conosle (by default, no output).
});
```

#### connect/disconnect
```
// connect to the Zigate
let port = '/dev/ttyUSB0';
myZikey.open({
  port:'/dev/ttyUSB0', // optionnal: if no port provided, the Driver will try to guess the right port.
  logger:'console',    // optionnal: output debug logs on console (by default, no log output)
});

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

#### send commands:
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

#### receive responses:
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

### The Zigate.Manager class:

Zigate.Manager is an 'higher level' abstraction of the Zigate key: it handles communication with it by using the Driver class and (would) provide additionnal features:
* (TODO) expose the availables devices, their endpoints / clusters / attributes and actions on them (get/set attribute's values, ...)
* (TODO) metadata related to clusters/attributes (names, type of data, ...
* (TODO) better API to start/stop inclusion mode
* (TODO) automatic discovering & retrieval of clusters & attributes after an association of a new Zigbee device

#### instanciation;
```
let Zigate = require('node-zigate');
let manager = new Zigate.Manager({
  logger: 'console' // optional: displays debug information to the conosle (by default, no output).
});
```

#### start Manager
```
manager.start({
  port: '/dev/ttyUSB0' // optional: if no port provided, try to guess it.
});
.then(()=> {
  console.log("manager started ; resetting the Zigate key");
  return manager.reset();
})
```

#### devices data:
TODO ; cf. classes:
- look at `src/manager/zidevice.js`
- .. which holds (0...n) `src/manager/ziendpoint.js`
- .. which holds (0...n) `src/manager/zicluster.js`
- .. which holds (0...n) `src/manager/ziattribute.js`

(TEMPORARY) Access from manager instance:
```
for (let shortAddress in manager.devices) {
  var device = manager.devices[shortAddress);
}

```


#### start inclusion mode
```
let timeInSeconds = 120;
manager.startInclusion(timeInSeconds);
```

## installation:

For the moment, no npm repository ; fetch directly from git

```npm install git+https://git@github.com/nouknouk/node-zigate.git```



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
