const path = require('path');
const fs = require('fs');
const Enum = require('./constants.js');
const colors = require('colors');

class CommandBuilder {
	constructor() {
		this.commands = [];
	}

	loadCommands(cmdDir) {
		this.commands = [];
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
				this.commands.push(cmd);
				Enum.COMMANDS.__add([cmd.id, cmd.name, cmd.description]);
		});
	}

	build(nameOrOptions, options) {
			if (typeof(nameOrOptions) === 'object') {
				options = nameOrOptions;
				nameOrOptions = options.name;
			}
			else if (typeof(nameOrOptions) === 'string') {
				options = options || {};
				options.name =  nameOrOptions;
			}
			else {
				throw new Error('CommandBuilder.build(): invalid parameters');
			}

			var cmdFactory = this.commands.find((t) => { return t.name === options.name; });
			var cmdType = Enum.COMMANDS(options.name);
			if (!cmdFactory || !cmdType) throw new Error("invalid command type name '"+options.name+"'.");

			var cmd = Object.defineProperties({}, {
				type:    {value: cmdType, enumerable: true},
				payload: {value: Buffer.alloc(0), writable:true},
				options: {value: options},
				inspect: {value: function(depth, options) {
					var str = (""+this.type+"").red;
					for (var k in this) {
						if (k!=='type' && k!=='payload' && k !== 'reader' && typeof(this[k]) !== 'function')
							str += ", " + (""+k) + ":" + (""+this[k]).grey;
					}
					return str;
				}},
			});
			cmdFactory.build(options, cmd);

			return cmd;
	}
}


CommandBuilder.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

module.exports = CommandBuilder;
