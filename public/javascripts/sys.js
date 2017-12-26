var sys = {};

sys.rng = function(min, max) {
	if (min.typeof === 'undefined') { min = 0 };
	if (max.typeof === 'undefined' || max < min ) {return -1}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};
sys.Rest = new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'map', true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200)
			resolve(this.responseText);				
		else if (this.status == 400)
			reject(Error("Fetch Failed"));
	};
    xhttp.send();
});