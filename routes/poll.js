module.exports = function(polls, User) {
	
	var express = require('express');
	var router = express.Router();

	
	router.get('/init', function(req, res, next) {	
		polls.add(req, res);
		if (req.headers.authorization) {
			var id = req.headers.authorization;//req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			polls.data[id].data = {};
			var user = new User(id), updateList = {};
			if (!_.isEmpty(updateList = user.checkLocal(users.users))) 
				polls.update(id, updateList);
			
		}
	});
	
	router.get('/', function(req, res, next) {	
		polls.add(req, res);
	});

   return router;

}
