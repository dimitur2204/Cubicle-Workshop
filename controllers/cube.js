const Cube = require('../models/cube');
const db = require('../controllers/database');
const getCubes = async () => {
	const cubes = await db.getAllCubes();
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
