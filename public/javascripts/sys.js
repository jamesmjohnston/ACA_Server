var sys = {};

sys.rng = function(min, max) {
	if (min.typeof === 'undefined') { min = 0 };
	if (max.typeof === 'undefined' || max < min ) {return -1}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

sys.Rest = function(Route, type) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(type, Route, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			return this.responseText;
		}
	};
    xhttp.send();
};