var sys = require('../bin/sys.js')('/home/ec2-user/node_modules/aca-server/data')
var express = require('express');
var router = express.Router();
router.users = {};
/* GET users listing. */
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
