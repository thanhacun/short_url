'use strict';

var path = process.cwd();
var validator = require('validator');
var UrlHandler = require(path + '/app/controllers/urlHandler.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}
	
	var urlHandler = new UrlHandler();

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');	
		});
		
	app.route('/new/:url*')
		//putting * after parametter will help to overcome passing url as a parameter
		.get(function(req, res) {
			//handle parameter
			var origin_url = urlHandler.para2url(req.params);
			//validate url
			if (validator.isURL(origin_url)) {
				//calling urlHander function that create/or show shortcut			
				urlHandler.makeShortcut(origin_url, req, res);
			} else {
				res.send('Not a valid internet link!');
			}
			
		});
		
	app.route('/:number')
		.get(function(req, res) {
			//calling urlHander function that redirect
			urlHandler.getUrl(req.params.number, function(origin_url) {
				if (origin_url) {
					res.redirect(origin_url);
				} else {
					res.send('The shortcut is not available!');
				}
				
			});
			
		});
	
};
