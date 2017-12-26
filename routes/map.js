var express = require('express');
var router = express.Router();

var loadText = function (filename, root) {
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  var txt = loadText('map','/home/ec2-user/node_modules/aca-server/data');
  res.send(txt);
});

module.exports = router;

