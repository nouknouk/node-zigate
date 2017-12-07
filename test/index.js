if (process.argv.length < 2 || !process.argv[2] || process.argv[2]==='-h' || process.argv[2]==='--help' ) {
  console.log("You must provide the path to the serial port of the Zigate key.")
  console.log("Examples:");
  console.log("    node test /dev/ttyUSB0     (linux)");
  console.log("    node test COM3             (windows)");
  process.exit(0);
}

const port=process.argv[2];

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
  console.log("response '"+response.type.name+"' received: ", JSON.stringify(response));
  myZikey.close();
  console.log("closing connexion...");
});


console.log("opening connexion to port '"+port+"'...");
myZikey.open(port);
