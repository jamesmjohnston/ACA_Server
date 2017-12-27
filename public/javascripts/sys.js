var sys = {};

sys.rng = function(min, max) {
	if (min.typeof === 'undefined') { min = 0 };
	if (max.typeof === 'undefined' || max < min ) {return -1}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

sys.Rest = function(route, json) {
	return new Promise(function(resolve, reject) {
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', route, true);
		xhttp.setRequestHeader("Content-type", json ? "application/json" : "text/plain");
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200)
				resolve(this.responseText);				
			else if (this.status == 400)
				reject(Error("Fetch Failed"));
		};
		xhttp.send();
	});
};

sys.loadJSON = function (filename) {
	console.log("debug: Loading " + filename + "...");
	try { 
		var data = require('fs').readFileSync(root + '/' +filename +'.txt', 'ascii');
		if (data.length == 0) {
			console.log("ERROR: " + filename + " had no data...");
			return {};
		} else {
			console.log("debug: " + filename + " loaded...");
			return data.length > 0 ? JSON.parse(data): {};
		}
	} catch (err) {
		console.log("ERROR: " + filename + " failed to load");
			console.log(err);
		process.exit(-1);
	}
};

sys.loadText = function (filename, root) {
	console.log("debug: Loading " + filename + "...");
	try { 
		var data = require('fs').readFileSync(root + '/' +filename +'.txt', 'ascii');
		if (data.length == 0) {
			console.log("Warning: " + filename + " had no data...");
			return "";
		} else {
			console.log("debug: " + filename + " loaded...");
			return data;
		}
	} catch (err) {
		console.log("ERROR: " + filename + " failed to load");
			console.log(err);
		process.exit(-1);
	}
};