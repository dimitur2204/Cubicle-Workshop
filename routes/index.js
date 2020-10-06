const cubeController = require('../controllers/cube');

module.exports = (app) => {
	app.get('/', async (req, res) => {
		const cubes = await cubeController.getCubes(req.query);
		res.render('index', { cubes });
	});
	app.get('/about', (req, res) => {
		res.render('about');
	});
	app.get('/create', (req, res) => {
		res.render('create');
	});
	app.post('/create', (req, res) => {
		const body = req.body;
		cubeController.createCube(
			body.name,
			body.description,
			body.imageUrl,
			body.difficulty
		);
		res.redirect('/');
	});
	app.get('/details/:id', async (req, res) => {
		const id = req.params.id;
		const cube = await cubeController.getCubeById(id);
		console.log(cube);
		res.render('details', cube);
	});
	app.get('*', (req, res) => {
		res.render('404');
	});
};
