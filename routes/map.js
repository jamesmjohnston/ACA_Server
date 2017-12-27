var sys = require('../bin/sys')('/home/ec2-user/node_modules/aca-server/data')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var txt = sys.loadText('map');
  res.send(txt);
});

module.exports = router;

