const mongoose = require('mongoose');
const Accessory = require('../models/accessory-model');
const Cube = require('../models/cube-model');


const getAllCubes = async () => {
	let result;
	try {
		result = await Cube.find({});
	} catch (err) {
		throw err;
	}
	return result;
};

const getAllAccessories = async () => {
	let result;
	try {
		result = await Accessory.find({});
	} catch (err) {
		throw err;
	}
	return result;
};

const getAccessoryById = async (id) => {
	let result;
	try {
		result = await Accessory.findById(id).select(
			'_id name description imageUrl'
		);
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

const getAccessoriesForCube = async (cubeId) => {
	const cube = await getCubeById(cubeId);
	await cube.populate('accessories').execPopulate();
	return cube.accessories;
};

module.exports = {
	getCubeById,
	getAllCubes,
	findByQueryObj,
	getAllAccessories,
	getAccessoryById,
	getAccessoriesForCube,
};
