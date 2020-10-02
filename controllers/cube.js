const Cube = require('../models/cube');
const db = require('../controllers/database');
const getCubes = async (query) => {
	const search = query.search;
	const from = Number(query.from);
	const to = Number(query.to);
	let cubes = await db.getAllCubes();
	if (search) {
		cubes = cubes.filter((c) => c.name.includes(search.toLowerCase()));
	}
	if (from) {
		cubes = cubes.filter((c) => c.difficulty >= from);
	}
	if (to) {
		cubes = cubes.filter((c) => c.difficulty <= to);
	}
	return cubes;
};
const getCubeById = async (id) => {
	const cube = await db.getCubeById(id);
	return cube;
};
const createCube = (name, description, imageUrl, difficulty) => {
	const cube = new Cube(name, description, imageUrl, difficulty);
	cube.save();
};

module.exports = {
	getCubes,
	getCubeById,
	createCube,
};
