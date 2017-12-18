const path = require('path');
const fs = require('fs');
const BufferReader = require('./buffer-reader.js');
const Enum = require('./enum.js');
const util = require('util');
const colors = require('colors');

Enum.create('RESPONSES');

const INSPECT_PRETTYFORMAT_FIELDS = {
	timestamp: function(timestamp, cmd) { return ""+timestamp.getFullYear()+'-'+(timestamp.getMonth()+1)+'-'+timestamp.getDate()+' '+timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds()+'.'+timestamp.getMilliseconds(); },
	address: function(address, cmd) { return '0x'+address.toString(16); },
}

class ResponseBuilder {
	constructor(options) {
	}

	loadResponses(repDir) {
		Enum.RESPONSES.clear();
		
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
				Enum.RESPONSES.add(rep);
		});
	}

	
	parse(typeid,payload) {
		var responseType = Enum.RESPONSES(typeid, new Error("invalid response typeid '"+typeid+"'."));
		var reader = new BufferReader(payload);
		var rep = Object.defineProperties({}, {
			type:    {value: responseType, enumerable: true},
			payload: {value: payload},
			reader:  {value: reader},
			inspect: {value: function(depth, options) { 
				var str = (""+this.type+"").green;
				for (var k in this) {
					if (k!=='type' && typeof(this[k]) !== 'function') {
						if (INSPECT_PRETTYFORMAT_FIELDS[k]) {
							str += ", "+(""+k)+":"+( INSPECT_PRETTYFORMAT_FIELDS[k](this[k]) ).grey;
						}
						else {
							str += ", "+(""+k)+":"+( ""+this[k] ).grey;
						}
					}
				}
				return str;
			}},
		});
		
		responseType.parse(reader, rep);
		
		if (reader.isMore()) {
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+responseType+"] the "+(payload.length - reader.tell())+" last bytes of data have not been parsed:");
			ResponseBuilder.LOGS.warn("[ResponseBuilder_"+responseType+"] response payload: "
				+ (payload.toString('hex').slice(0, reader.tell()).replace(/../g, "$& ")).green
				+ (payload.toString('hex').slice(reader.tell()).replace(/../g, "$& ")).red
			);
		}
		return rep;
	}

}

ResponseBuilder.LOGS = {
	console: { trace: console.trace, debug: console.debug, log: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        log: ()=>{},      warn: ()=>{},       error: ()=>{},       },	
};
module.exports = ResponseBuilder;
