const port=process.argv.length >= 3 ? process.argv[2] : null;

let Zigate = require(__dirname+'/..');

let myZikey = new Zigate();

myZikey.on('open', function(err) {
  if (err) {
    console.error("[test] connexion failed: ",err);
  }
  else {
    console.log("[test] connexion to Zigate well established.");

    myZikey.send("get_version");
    console.log("[test] command 'get_version' sent ; awaiting response...");
  }
});

myZikey.on('close', function() {
  console.error("[test] connexion to Zigate closed. Exiting.");
  process.exit(0);
});

myZikey.on('error', function(err) {
  console.error("[test] error: ",err);
});

myZikey.on('response', function(response) {
  console.log("[test] response '"+response.type.name+"' received: ", JSON.stringify(response));
  myZikey.close();
  console.log("[test] closing connexion...");
});


if (port) console.log("[test] opening connexion to port '"+port+"'...");
else console.log("[test] attempt to guess the Zigate port before connecting...");
myZikey.open(port);
