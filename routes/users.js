module.exports = function(polls, map, User) {
	var express = require('express');
	var router = express.Router();

	router.users = {};
	router.get('/move/:dir', function(req, res, next) {
		var id = req.headers.authorization;
		var user = new User(id);

        // move user
        user.move(parseInt(req.params.dir));

        // expand visible chunks
		var chunks = map.getVisibleChunks(user);
		var view = user.expandChunks(chunks, map);

		user.save();

        // push data to relevant users
        polls.pollLocalUsers(user, router.users);
		
        // repond with new chunks of availabe
		res.send(view);
	});

	
	router.get('/', function(req, res, next) {
	  var id = req.headers.authorization;
	  res.send(new User(id));
	});

	router.init = function() {
        // load user list
		this.users = sys.loadJSON('users');
	};

   return router;

}
