const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const {checkUser} = require('../middleware/auth-middleware');

module.exports = (app) => {
	app.engine('.hbs', handlebars({ extname: '.hbs' }));
	app.set('view engine', '.hbs');

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cookieParser());
	app.use(express.static('static'));
	app.use(checkUser)
};
