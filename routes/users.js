var express = require('express');
var router = express.Router();
router.users = {};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello Dad and Mack');
});

router.init = function() {
	this.users = sys.readJSON('users');
};

module.exports = router;
