const port='/dev/ttyUSB0';

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
  console.log("response received: ", JSON.stringify(response));
  myZikey.close();
  console.log("closing connexion...");

});
    

myZikey.open(port);

