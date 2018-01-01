module.exports = function(polls, map, User) {
	var express = require('express');
	var router = express.Router();

	router.users = {};
	/* GET users listing. */
	router.get('/move/:dir', function(req, res, next) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		console.log("moving- " + ip);
		var user = new User(ip);
		switch (parseInt(req.params.dir)) {
			case 0:
				user.walked++;
				user.x--;
				break;

			case 1:
				user.walked++;
				user.y++;
				break;
			
			case 2:
				user.walked++;
				user.x++;
				break;
			
			case 3:
				user.walked++;
				user.y--;
				break;
		}
		var chunks = map.getVisibleChunks(user);
		var view = {};

		for (var i in chunks) {
			if (_.indexOf(user.chunks, chunks[i])<0) {
				user.chunks.push(chunks[i]);
				console.log("adding: ", map.data[chunks[i]]);
				view[chunks[i]] = map.data[chunks[i]];
			}
		}

		if (!_.isEmpty(updateList = user.checkLocal(router.users))) 
			polls.update(ip, updateList);
		
		user.save();
		res.send(view);
	});

	
	router.get('/', function(req, res, next) {
	  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  console.log("fetching- " + ip);
	  res.send(new User(ip));
	});

	router.init = function() {
		this.users = sys.loadJSON('users');
	};

   return router;

}
