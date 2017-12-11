const path = require('path');
const fs = require('fs');
const BufferReader = require('./buffer-reader.js');

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
				//console.log("[Zigate] response type '" + id + "' loaded.");
		});
	}

	parse(typeid,payload) {
		var repType = this.responses.find((t) => { return t.id === typeid; });
		if (!repType) throw new Error("invalid response typeid '"+typeid+"'.");

		var reader = new BufferReader(payload);
		
		var rep = Object.defineProperties({}, {
			type:    {value:repType, enumerable: true},
			payload: {value: payload},
			reader:  {value: reader},
		});

		repType.parse(reader, rep);
		
		if (reader.isMore()) {
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+typeid+"] the "+(payload.length - reader.tell())+" last bytes of data has not been readen:");
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+typeid+"] response payload: "+payload.toString('hex').replace(/../g, "$& "));
		}
		return rep;
	}

}

ResponseBuilder.LOGS = { log: ()=>{}, warn: ()=>{}, error: ()=>{}, debug: ()=>{} };
module.exports = ResponseBuilder;
