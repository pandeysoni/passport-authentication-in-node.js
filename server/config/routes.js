
/**
 * Module dependencies.
 */

var User = require('../controllers/user');

/**
 * Expose
 */

module.exports = function (app, passport) {
  /**Declare all routes file */
	app.post('/login',
	passport.authenticate('local', {
	}), User.login);
	app.post('/create', User.create);
	app.get('/logout', User.logout);

	app.get('/', function(req, res) {
	    res.sendFile('./client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.get('/auth/facebook',
	    passport.authenticate('facebook', {
    }), User.login);
  	app.get('/auth/facebook/callback',
	    passport.authenticate('facebook', {
	      failureRedirect: '/login'
    }), User.authCallback);
    
  	// app.get('/auth/github',
	  //   passport.authenticate('github', {
	  //     failureRedirect: '/login'
   //  }), users.signin);
  	// app.get('/auth/github/callback',
	  //   passport.authenticate('github', {
	  //     failureRedirect: '/login'
   //  }), users.authCallback);
  	// app.get('/auth/twitter',
	  //   passport.authenticate('twitter', {
	  //     failureRedirect: '/login'
   //  }), users.signin);
  	// app.get('/auth/twitter/callback',
	  //   passport.authenticate('twitter', {
	  //     failureRedirect: '/login'
   //  }), users.authCallback);
  	// app.get('/auth/google',
	  //   passport.authenticate('google', {
	  //     failureRedirect: '/login',
	  //     scope: [
	  //       'https://www.googleapis.com/auth/userinfo.profile',
	  //       'https://www.googleapis.com/auth/userinfo.email'
	  //     ]
   //  }), users.signin);
  	// app.get('/auth/google/callback',
	  //   passport.authenticate('google', {
	  //     failureRedirect: '/login'
   //  }), users.authCallback);
  	// app.get('/auth/linkedin',
	  //   passport.authenticate('linkedin', {
	  //     failureRedirect: '/login',
	  //     scope: [
	  //       'r_emailaddress'
	  //     ]
   //  }), users.signin);
  	// app.get('/auth/linkedin/callback',
	  //   passport.authenticate('linkedin', {
	  //     failureRedirect: '/login'
   //  }), users.authCallback);
};
