var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Map = require('./bin/cMap.js');
var User = require('./bin/cUser.js');
var Poll = require('./bin/cPoll.js');
_ = require('lodash');
sys = require('./bin/cSys.js')('./data')
var polls = new Poll();
var mainGrid = new Map('map');

var index = require('./routes/index');
users = require('./routes/users')(polls, mainGrid, User);
var poll = require('./routes/poll')(polls, User);
var map = require('./routes/map')(polls, mainGrid, User);

var app = express();
users.init();
for (u in users.users)
	console.log("user- "+u);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/poll', poll);
app.use('/map', map);


function gameLoop() {
	console.log('saving');
	sys.saveJSON('users',users.users);
	setTimeout(gameLoop, 3000);
}

gameLoop();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
