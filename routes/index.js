const cubeRoutes = require('./cube');
const accessoryRoutes = require('./accessory');

module.exports = (app) => {
	app.use(cubeRoutes);

	app.use(accessoryRoutes);

	app.get('/about', (_, res) => {
		res.render('about');
	});

	app.get('*', (_, res) => {
		res.render('404');
	});
};
