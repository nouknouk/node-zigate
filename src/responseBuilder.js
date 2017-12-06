const path = require('path');

var ResponseBuilder = function() {
	this.responses = [];
};

ResponseBuilder.prototype.loadResponses = function(repDir) {
	repDir = repDir || __dirname +'/responses';
	
	var fileList = fs.readdirSync(path.resolve(repDir));
	fileList.forEach((id) => {
			var repPath = path.resolve(repDir + "/" + id);
			try {
					var rep = require(repPath);
			} catch (e) {
					console.error("exception while loading response '" + id + "'.");
					throw e;
			}
			this.responses.push(rep);
			console.log("[Zigate] response type '" + id + "' loaded.");
	});	
};

ResponseBuilder.prototype.parse = function(typeid,payload) {
		var repType = this.responses.find((c) => { return c.typeid === typeid; });
		if (!repType) throw new Error("invalid response type id '"+typeid+"'.");
		
		var rep = repType.parse(payload);
		
		return rep;
};

module.exports = ResponseBuilder;
