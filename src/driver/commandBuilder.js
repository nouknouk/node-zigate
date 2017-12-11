const path = require('path');
const fs = require('fs');

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
				//console.log("[Zigate] command type '" + id + "' loaded.");
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

			var cmdType = this.commands.find((t) => { return t.name === options.name; });
			if (!cmdType) throw new Error("invalid command type name '"+options.name+"'.");

			var cmd = {
				type: cmdType,
				typeHex: cmdType.id.toString(16),
				options: options,
				payload: Buffer.alloc(0),
			};
			cmdType.build(options, cmd);

			return cmd;
	}
}


CommandBuilder.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };

module.exports = CommandBuilder;
