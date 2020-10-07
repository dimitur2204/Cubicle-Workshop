const Cube = require('../models/cube-model');
const db = require('../controllers/database');
const accessory = require('./accessory');

const getCubes = async (query) => {
	const search = query.search;
	const from = Number(query.from);
	const to = Number(query.to);
	let cubes;
	cubes = db.findByQueryObj({
		name: {
			$regex: new RegExp(search, 'i') || '.*',
		},
		difficulty: {
			$gte: from || 0,
			$lte: to || Number.MAX_SAFE_INTEGER,
		},
	});
	return cubes;
};

const getCubeById = async (id) => {
	const cube = db.getCubeById(id);
	return cube;
};

const createCube = (name, description, imageUrl, difficulty) => {
	const cube = new Cube({
		name,
		description,
		imageUrl,
		difficulty,
	});
	cube.save();
};

module.exports = {
	getCubes,
	getCubeById,
	createCube,
};
