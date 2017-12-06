const path = require('path');
const fs = require('fs');

var CommandBuilder = function() {
	this.commands = [];
};

CommandBuilder.prototype.loadCommands = function(cmdDir) {
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
};

CommandBuilder.prototype.build = function(nameOrOptions, options) {
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

		var cmdType = this.commands.find((c) => { return c.typename === options.name; });
		if (!cmdType) throw new Error("invalid command type name '"+options.name+"'.");

		var cmd = cmdType.build(options);
		cmd.payload = cmd.payload || Buffer.alloc(0);

		return cmd;
};

module.exports = CommandBuilder;
