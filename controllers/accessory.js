const db = require('../controllers/database');
const { findByIdAndUpdate } = require('../models/accessory-model');
const Accessory = require('../models/accessory-model');
const Cube = require('../models/cube-model');

const getAccessories = async () => {
	return await db.getAllAccessories();
};

const getAccessoryById = async (id) => {
	const accessory = db.getAccessoryById(id);
	return accessory;
};

const createAccessory = (name, description, imageUrl) => {
	const accessory = new Accessory({
		name,
		description,
		imageUrl,
	});
	accessory.save();
};

const attachAccessory = async (accessoryId, cubeId) => {
	const accessory = await Accessory.findById(accessoryId);
	const cube = await Cube.findByIdAndUpdate(cubeId, {
		$addToSet: { accessories: accessory },
	});
	cube.save();
};

const getAccessoriesForCube = async (cubeId) => {
	const accessories = await db.getAccessoriesForCube(cubeId);
	return accessories;
};

module.exports = {
	getAccessories,
	getAccessoryById,
	createAccessory,
	attachAccessory,
	getAccessoriesForCube,
};
