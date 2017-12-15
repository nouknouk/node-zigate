const path = require('path');
const fs = require('fs');
const Enum = require('./enum.js');
const colors = require('colors');

Enum.create('COMMANDS');
		
class CommandBuilder {
	constructor() {
	}

	loadCommands(cmdDir) {
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
			var type = (typeof(typeOrOptions) === 'object') ? options.type : ""+typeOrOptions;
			var options = ((typeof(typeOrOptions) === 'object') ? typeOrOptions : options) || {};

			var commandType = Enum.COMMANDS(type, new Error("invalid command type name '"+type+"'."));

			var cmd = Object.defineProperties({}, {
				type:    {value: commandType, enumerable: true},
				payload: {value: Buffer.alloc(0), writable:true},
				options: {value: options},
				inspect: {value: function(depth, options) {
					var str = (""+this.type+"").red;
					for (var k in this) {
						if (k!=='type' && typeof(this[k]) !== 'function')
							str += ", " + (""+k) + ":" + (""+this[k]).grey;
					}
					return str;
				}},
			});
			commandType.build(options, cmd);

			return cmd;
	}
}


CommandBuilder.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

module.exports = CommandBuilder;
