const cubeRoutes = require('./cube');
const accessoryRoutes = require('./accessory');
const authRoutes = require('./auth');
const { checkUser } = require('../middleware/auth-middleware');

module.exports = (app) => {
	app.use(checkUser);
	app.use(cubeRoutes);
	app.use(accessoryRoutes);
	app.use(authRoutes);

	app.get('/about', (_, res) => {
		res.render('about');
	});

	app.get('*', (_, res) => {
		res.render('404');
	});
};
