var sys = require('../bin/sys.js')('/home/ec2-user/node_modules/aca-server/data')
var express = require('express');
var router = express.Router();
router.users = {};
/* GET users listing. */
router.get('/move/:dir', function(req, res, next) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("moving- " + ip);
	user = new User(ip);
	switch (req.params[dir]) {
		case 0:
			user.x--;
			break;
		case 1:
			user.y++;
			break;
		
		case 2:
			user.x++;
			break;
		
		case 3:
			user.y--;
			break;
	}
	console.log(user);
	user.save();
    res.send(user);
});

router.get('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("fetching- " + ip);
  user = new User(ip);
  res.send(user);
});

router.init = function() {
	this.users = sys.loadJSON('users');
};

module.exports = router;
