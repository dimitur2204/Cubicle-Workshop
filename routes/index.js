const {
	attachAccessory,
} = require('../controllers/accessory');
const cubeController = require('../controllers/cube');
const accController = require('../controllers/accessory');
const Accessory = require('../models/accessory-model');
const Cube = require('../models/cube-model');

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
	app.get('/create/accessory', (req, res) => {
		res.render('createAccessory');
	});
	app.post('/create/accessory', (req, res) => {
		const { name, description, imageUrl } = req.body;
		const acc = new Accessory({ name, description, imageUrl });

		acc.save();
		res.redirect('/');
	});
	app.get('/attach/accessory/:id', async (req, res) => {
		const id = req.params.id;
		const cube = await cubeController.getCubeById(id);
		const cubeAccIdsStrings = cube.accessories.map((acc) =>
			acc.valueOf().toString()
		);
		const accessories = await (await accController.getAccessories()).filter(
			(acc) => {
				return !cubeAccIdsStrings.includes(acc._id.valueOf().toString());
			}
		);
		const isThereAcc = !!accessories.length;
		res.render('attachAccessory', { cube, accessories, isThereAcc });
	});
	app.post('/attach/accessory/:id', (req, res) => {
		const cubeId = req.params.id;
		const body = req.body;
		const accId = body.accId;
		attachAccessory(accId, cubeId);
		res.redirect('/');
	});
	app.post('/create', (req, res) => {
		const body = req.body;
		cubeController.createCube(
			body.name,
			body.description,
			body.imageUrl,
			body.difficultyLevel
		);
		res.redirect('/');
	});
	app.get('/details/:id', async (req, res) => {
		const id = req.params.id;
		const cube = await cubeController.getCubeById(id);
		const accessories = await accController.getAccessoriesForCube(id);

		res.render('details', { cube, accessories });
	});
	app.get('/delete/:id', async (req,res) =>{
		const id = req.params.id;
		const cube = await cubeController.getCubeById(id);
		res.render('delete', cube);
	})
	app.post('/delete/:id', async (req,res) =>{
		const id = req.params.id;
		await Cube.findByIdAndRemove(id,(err) => {
			res.redirect('/');
		})
	})
	app.get('*', (req, res) => {
		res.render('404');
	});
};
