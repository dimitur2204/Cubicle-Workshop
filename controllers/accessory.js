const Accessory = require('../models/accessory-model');

const getAccessories = async () => {
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

const getCreateAccessory = (_, res) => {
	res.render('createAccessory');
};

const postCreateAccessory = (req, res, next) => {
	const { name, description, imageUrl } = req.body;
	const acc = new Accessory({ name, description, imageUrl });
	acc.save().then(() => {
		res.redirect('/');
	}).catch(next);
	
};



module.exports = {
	getAccessories,
	getAccessoryById,
	postCreateAccessory,
	getCreateAccessory
};
