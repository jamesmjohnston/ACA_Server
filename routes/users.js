var sys = require('../bin/sys.js')('/home/ec2-user/node_modules/aca-server/data')
var express = require('express');
var router = express.Router();
router.users = {};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello Dad and Mack');
});

router.init = function() {
	this.users = sys.loadJSON('users');
};

module.exports = router;
