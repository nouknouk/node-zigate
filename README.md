# node-zigate

__This project is still under active development ; not very usable yet.__

for developpers which want to have a look, better clone the latest dev/v*.** branch

## installation:

For the moment, no npm repository ; fetch directly from git, branch dev/v0.01

```npm install git+https://git@github.com/nouknouk/node-zigate.git#dev/v0.01```

This module depends on node module 'serialport', which is based on a native addon (compiled by node-gyp). 
Therefore, some build tools must be present on your machine, to make the installation successfull.

## usage:

```
let Zigate = require('node-zigate');

let myZikey = new Zigate();
myZikey.open('/dev/ttyUSB0');

myZikey.on('open', function(err) {
  if (err) {
    console.error("connection failed: ",err);
  }
  else {
    console.log("connection to Zigate well established.");
    myZikey.send("get_version");
  }
});

myZikey.on('close', function() {
  console.error("connectino to Zigate terminated.");
});

myZikey.on('error', function(err) {
  console.error("error: ",err);
});

myZikey.on('response', function(response) {
  console.log("response received: ", JSON.stringify(response));
});
