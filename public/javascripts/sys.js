var sys = {};

sys.rng = function(min, max) {
	if (min.typeof === 'undefined') { min = 0 };
	if (max.typeof === 'undefined' || max < min ) {return -1}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

sys.Rest = function(route) {
	return new Promise(function(resolve, reject) {
		var xhttp = new XMLHttpRequest();
		xhttp.open('GET', route, true);
		xhttp.setRequestHeader("Content-type","application/json");
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200)
				resolve(JSON.parse(this.responseText));				
			else if (this.status == 400)
				reject(Error("Fetch Failed"));
		};
		xhttp.setRequestHeader("Authorization", username);
		xhttp.send();
	});
};

sys.LongPoll = function(init) {
	var xhttp = new XMLHttpRequest();
	xhttp.timeout = 30000;
	xhttp.responseType = 'text';
	
	xhttp.onload = function(e2){
		draw.drawOtherUsers(JSON.parse(this.responseText));
		sys.LongPoll();
	}
	
	xhttp.ontimeout = function(){
		
	}
		
	xhttp.open('GET', "poll" + (init ? "/init" : ""), true);
	xhttp.setRequestHeader("Authorization", username);
	xhttp.send();
}

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