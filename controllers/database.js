const fs = require('fs');
const path = require('path');
const util = require('util');
const pathToDB = path.resolve('./config/database.json');
const getAllCubes = () => {
	const readFilePromise = util.promisify(fs.readFile);
	return readFilePromise(pathToDB, { encoding: 'utf-8' })
		.then((data) => JSON.parse(data))
		.catch((err) => {
			console.error(err);
		});
};

const getCubeById = async (id) => {
	const cubes = await getAllCubes();
	return cubes.find((c) => c.id === id);
};

const addNewCube = async (cube) => {
	const cubes = await getAllCubes();
	cubes.push(cube);
	return util.promisify(
		fs.writeFile(pathToDB, JSON.stringify(cubes), (err) => {
			if (err) {
				Promise.reject(err);
			}
		})
	);
};

module.exports = {
	getCubeById,
	getAllCubes,
	addNewCube,
};
