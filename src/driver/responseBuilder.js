const path = require('path');
const fs = require('fs');
const BufferReader = require('./buffer-reader.js');
const Enum = require('./constants.js');
const util = require('util');
const colors = require('colors');

Enum.create('RESPONSES');

class ResponseBuilder {
	constructor(options) {
		this.responses = [];
	}

	loadResponses(repDir) {
		repDir = repDir || __dirname +'/responses';

		var fileList = fs.readdirSync(path.resolve(repDir));
		fileList.forEach((id) => {
				var repPath = path.resolve(repDir + "/" + id);
				try {
						var rep = require(repPath);
						rep.typeHex = rep.id.toString(16);
				} catch (e) {
						console.error("exception while loading response '" + id + "'.");
						throw e;
				}
				this.responses.push(rep);
				Enum.RESPONSES.__add([rep.id, rep.name, rep.description]);
		});
	}

	parse(typeid,payload) {
		var responseFactory = this.responses.find((t) => { return t.id === typeid; });
		var repType = Enum.RESPONSES(typeid);
		if (!responseFactory || !repType) throw new Error("invalid response typeid '"+typeid+"'.");

		var reader = new BufferReader(payload);
		
		var rep = Object.defineProperties({}, {
			type:    {value: repType, enumerable: true},
			payload: {value: payload},
			reader:  {value: reader},
			inspect: {value: function(depth, options) { 
				var str = (""+this.type+"").green;
				for (var k in this) {
					if (k!=='type' && k!=='payload' && k !== 'reader' && typeof(this[k]) !== 'function')
						str += ", "+(""+k)+":"+(""+this[k]).grey;
				}
				return str;
			}},
		});
		
		responseFactory.parse(reader, rep);
		
		if (reader.isMore()) {
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+typeid+"] the "+(payload.length - reader.tell())+" last bytes of data has not been readen:");
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+typeid+"] response payload: "+payload.toString('hex').replace(/../g, "$& "));
		}
		return rep;
	}

}

ResponseBuilder.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ResponseBuilder;
