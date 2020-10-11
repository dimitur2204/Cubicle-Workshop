const cubeRoutes = require('./cube');
const accessoryRoutes = require('./accessory');
const authRoutes = require('./auth');

module.exports = (app) => {
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
