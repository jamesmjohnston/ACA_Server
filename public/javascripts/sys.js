var sys = {};

sys.rng = function(min, max) {
	if (min.typeof === 'undefined') { min = 0 };
	if (max.typeof === 'undefined' || max < min ) {return -1}

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

sys.Rest = function(Route, type) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(type, BASE_URL + Route, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();
    var response = xhttp.responseText;
};