const mongoose = require('mongoose');
const Cube = require('../models/cube-model');
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cubicle-workshop.cmgb5.mongodb.net/cubicle-workshop?retryWrites=true&w=majority`;

mongoose.connect(connectionString);

const getAllCubes = async () => {
	let result;
	try {
		result = await Cube.find({});
	} catch (err) {
		throw err;
	}
	return result;
};

const getCubeById = async (id) => {
	let result;
	try {
		result = await Cube.findById(id);
	} catch (err) {
		throw err;
	}
	return result;
};
const findByQueryObj = async (queryObj) => {
	let result;
	try {
		result = await Cube.find(queryObj);
	} catch (err) {
		throw err;
	}
	return result;
};
module.exports = {
	getCubeById,
	getAllCubes,
	findByQueryObj,
};
