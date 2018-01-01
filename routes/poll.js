module.exports = function(polls, User) {
	
	var express = require('express');
	var router = express.Router();

	
	router.get('/:cmd', function(req, res, next) {	
		polls.add(req, res);
		if (req.params.cmd == "init") {
			var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			polls.data[ip].data = {};
			var user = new User(ip), updateList = {};
			if (!_.isEmpty(updateList = user.checkLocal(users.users))) 
				polls.update(ip, updateList);
			
		}
	});
	
	router.get('/', function(req, res, next) {	
		polls.add(req, res);
	});

   return router;

}
