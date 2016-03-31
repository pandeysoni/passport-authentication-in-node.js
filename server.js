
/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	config = require('./server/config/config'),
  db = require('./server/config/db'),
	bodyParser = require('body-parser'),
  path = require('path'),
  passport = require('passport'),
  expressSession = require('express-session'),
	cookieParser = require('cookie-parser');

var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
  console.log(config.db);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//use cookie parser to store data
app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere'}));
//load client folder
app.use(express.static(path.join(__dirname, 'client/')));
//bodyparser to use for request and respnse and set limit in request body data
app.use(bodyParser.urlencoded({ limit: '52428800', extended: true }));
app.use(bodyParser.json({limit: '52428800'}));

// Bootstrap models
fs.readdirSync(__dirname + '/server/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/server/models/' + file);
});

// Bootstrap passport config
require('./server/config/passport')(passport);


app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
require('./server/config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
