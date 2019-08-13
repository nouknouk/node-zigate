const util = require('util');
const path = require('path');
const fs = require('fs');
const BufferReader = require('./buffer-reader.js');
const Enum = require('./enum.js');
const colors = require('colors');
const VERSION = Symbol('VERSION');

Enum.create('RESPONSES');

const INSPECT_PRETTYFORMAT_FIELDS = {
	timestamp: function(timestamp, cmd) { return ""+timestamp.getFullYear()+'-'+(timestamp.getMonth()+1)+'-'+timestamp.getDate()+' '+timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds()+'.'+timestamp.getMilliseconds(); },
	address: function(address, cmd) { return '0x'+address.toString(16); },
	value: function(value, cmd) { return JSON.stringify(value); },
	definition: function(definition, cmd) { return definition && definition.name ? definition.name : 'unknown'; },
	status: function(value, cmd) { return JSON.stringify(value); },
	devices: function(value, cmd) {
		let str = "";
		value.forEach(d => {
			str += str ? ", {": "{";
			for (var k in d) {
				if (k!=='type' && typeof(d[k]) !== 'function') {
					if (INSPECT_PRETTYFORMAT_FIELDS[k]) {
						var strval = INSPECT_PRETTYFORMAT_FIELDS[k](d[k]);
						str += ", "+(""+k)+":"+(strval ? strval.grey : strval);
					}
					else {
						str += ", "+(""+k)+":"+( ""+d[k] ).grey;
					}
				}
			}
			str +="}";
		});
		return str;
	}
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

	set version(version) { this[VERSION] = version; }
	get version() { return this[VERSION]; }
	get versionHex() { return this[VERSION] && (this[VERSION]).toString(16); }

	parse(typeid,payload) {
		var responseType = Enum.RESPONSES(typeid, new Error("invalid response typeid '"+typeid+"'."));

		var reader = new BufferReader(payload);
		var rep = Object.defineProperties({}, {
			type:    {value: responseType, enumerable: true},
			payload: {value: payload},
			reader:  {value: reader},
			[util.inspect.custom]: {value: function(depth, options) {
				var str = (""+this.type+"").green;
				for (var k in this) {
					if (k!=='type' && typeof(this[k]) !== 'function') {
						if (INSPECT_PRETTYFORMAT_FIELDS[k]) {
							var strval = INSPECT_PRETTYFORMAT_FIELDS[k](this[k]);
							str += ", "+(""+k)+":"+(strval ? strval.grey : strval);
						}
						else {
							str += ", "+(""+k)+":"+( ""+this[k] ).grey;
						}
					}
				}
				return str;
			}},
		});

		responseType.parse(reader, rep, this.version);

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
	console: { trace: console.debug, debug: console.debug, info: console.log, warn: console.warn, error: console.error },
	warn:    { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: console.warn, error: console.error },
	error:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: console.error },
	nolog:   { trace: ()=>{},        debug: ()=>{},        info: ()=>{},      warn: ()=>{},       error: ()=>{},       },
};
module.exports = ResponseBuilder;
