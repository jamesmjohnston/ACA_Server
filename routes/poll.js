module.exports = function(polls, User) {
	
	var express = require('express');
	var router = express.Router();
	
	router.get('/init', function(req, res, next) {	
	    var id = req.headers.authorization;
        polls.init(id, res);
	});
	
	router.get('/', function(req, res, next) {	
		polls.recieve(req.headers.authorization, res);
	});

    router.get('/kill', function(req, res, nest) {
        polls.remove(req.headers.authirization, res);
    });

   return router;
}
