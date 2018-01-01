module.exports = function(poll, map, User) {
	var express = require('express');
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  var id = req.headers.authorization;//req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  console.log("mapping- " + id);
	  user = new User(id);
	  user.chunks = map.getVisibleChunks(user);
	  user.save();
	  res.send(map.initView(user));
	});

   return router;
}
