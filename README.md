# node-zigate

__This project is still under active development ; not very usable yet.__

It's mostly for developpers which want to have a look / contribute.

## installation:

For the moment, no npm repository ; fetch directly from git

```npm install git+https://git@github.com/nouknouk/node-zigate.git```

## dependencies

This module depends on node module 'serialport', which is based on a native addon (compiled by node-gyp). 
Therefore, some build tools must be present on your machine, to make the installation successfull.


## quick try:

```
git clone https://github.com/nouknouk/node-zigate.git
cd node-zigate
npm install
node test /dev/[your Zigate serial port like ttyUSB0]
```

## API basic example:

```
let Zigate = require(__dirname+'/..');

let myZikey = new Zigate();

myZikey.on('open', function(err) {
  if (err) {
    console.error("connection failed: ",err);
  }
  else {
    console.log("connection to Zigate well established.");

    myZikey.send("get_version");
    console.log("command 'get_version' sent ; awaiting response...");
  }
});

myZikey.on('close', function() {
  console.error("connection to Zigate closed. Exiting.");
  process.exit(0);
});

myZikey.on('error', function(err) {
  console.error("error: ",err);
});

myZikey.on('response', function(response) {
  console.log("response '"+response.type.name+"' received: ", response);
  myZikey.close();
  console.log("closing connexion...");
});

let port = '/dev/ttyUSB0';
console.log("opening connexion to port '"+port+"'...");
myZikey.open(port);

```
