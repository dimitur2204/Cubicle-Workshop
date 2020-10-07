const db = require('../controllers/database');
const Accessory = require('../models/accessory-model');

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
	const cube = await db.getCubeById(cubeId);
	cube.accessories.push(accessoryId);
	const accessory = await db.getAccessoryById();
	accessory.cubes.push(cubeId);
	cube.save();
	accessory.save();
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
