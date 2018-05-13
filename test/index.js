
// port is not mandatory: node-zigate may guess automatically (or not) the right port if none provided
const port=process.argv.length >= 3 ? process.argv[2] : null;

let Zigate = require(__dirname+'/..');

let myZikey = new Zigate.Driver();

myZikey.on('close', function() {
  console.error("connection to Zigate closed.");
});

myZikey.on('error', function(err) {
  console.error("error: ",err);
});

myZikey.on('response', function(response) {
  console.log("response '"+response.type.name+"' received: ", response);
  if (response.type.name === 'version_list') {
    console.log("closing connexion...");
    myZikey.close().then(()=> {
      console.log("connexion closed. Exiting");
      process.exit(0);
    });
  }
});

if (port) {
  console.log("opening connexion to port '"+port+"'...");
}
else {
  console.log("No port provided ; will guess the Zigate port automatically before connecting.");
}
myZikey.open(port).then(()=> {
  console.log("connection to Zigate well established.");
  myZikey.send("version");
  console.log("command 'version' sent ; awaiting response...");
});
