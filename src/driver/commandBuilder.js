const path = require('path');
const fs = require('fs');
const Enum = require('./enum.js');
const colors = require('colors');

Enum.create('COMMANDS');

const INSPECT_PRETTYFORMAT_FIELDS = {
	timestamp: function(timestamp, cmd) { return ""+timestamp.getFullYear()+'-'+(timestamp.getMonth()+1)+'-'+timestamp.getDate()+' '+timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds()+'.'+timestamp.getMilliseconds(); },
	address: function(address, cmd) { return '0x'+address.toString(16); },
	value: function(value, cmd) { return JSON.stringify(value); },
}

class CommandBuilder {
	constructor() {
	}

	loadCommands(cmdDir) {
		Enum.COMMANDS.clear();

		cmdDir = cmdDir || __dirname +'/commands';
		var fileList = fs.readdirSync(path.resolve(cmdDir));
		fileList.forEach((id) => {
				var cmdPath = path.resolve(cmdDir + "/" + id);
				try {
						var cmd = require(cmdPath);
				} catch (e) {
						console.error("exception while loading command '" + id + "'.");
						throw e;
				}
				Enum.COMMANDS.add(cmd);
		});
	}

	build(typeOrOptions, options) {
			var type = (typeof(typeOrOptions) === 'object') ? typeOrOptions.type : ""+typeOrOptions;
			var options = ((typeof(typeOrOptions) === 'object') ? typeOrOptions : options) || {};

			var commandType = Enum.COMMANDS(type, new Error("invalid command type name '"+type+"'."));

			var cmdPromiseResolve = null;
			var cmdPromiseReject = null;
			var cmdPromise = new Promise( (resolve, reject) => {
				cmdPromiseResolve = resolve;
				cmdPromiseReject = reject;
			});

			var cmd = Object.defineProperties({}, {
				type:    {value: commandType, enumerable: true},
				payload: {value: Buffer.alloc(0), writable:true},
				options: {value: options},
				cmdPromise: {value: cmdPromise},
				cmdPromiseResolve: {value: cmdPromiseResolve},
				cmdPromiseReject: {value: cmdPromiseReject},
				status:  {value: null, writable:true},
				response: {value: null, writable:true},
				timer: {value: null, writable: true},
				inspect: {value: function(depth, options) {
					var str = (""+this.type+"").red;
					for (var k in this) {
						if (k!=='type' && typeof(this[k]) !== 'function') {
							if (INSPECT_PRETTYFORMAT_FIELDS[k]) {
								str += ", " + (""+k) + ":" + ( ""+INSPECT_PRETTYFORMAT_FIELDS[k](this[k]) ).grey;
							}
							else {
								str += ", " + (""+k) + ":" + ( ""+this[k] ).grey;
							}
						}
					}
					return str;
				}},
			});
			commandType.build(options, cmd);

			return cmd;
	}
}


CommandBuilder.LOGS = {
	console: { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};

module.exports = CommandBuilder;
