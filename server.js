
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
	cookieParser = require('cookie-parser'),
	app = express(),
	port = process.env.PORT || 3000;

//use cookie parser to store data
app.use(cookieParser());
app.use(expressSession({secret:'somesecrettokenhere'}));
//load client folder
app.use(express.static(path.join(__dirname, 'client/')));
//bodyparser to use for request and respnse and set limit in request body data
app.use(bodyParser.urlencoded({ limit: '52428800', extended: true }));
app.use(bodyParser.json({limit: '52428800'}));

// Bootstrap passport config
require('./server/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Bootstrap routes
require('./server/config/routes')(app, passport);

app.listen(port);
console.log('Express app started on port ' + port);
