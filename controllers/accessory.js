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

const getCreateAccessory = (req, res) => {
	res.render('createAccessory',{errorMessage:req.query.message});
};

const postCreateAccessory = (req, res, next) => {
	const { name, description, imageUrl } = req.body;
	const acc = new Accessory({ name, description, imageUrl });
	acc.save().then(() => {
		res.redirect('/');
	}).catch(err => {
		res.status(401).redirect(`/create/accessory?error=true&message="${err.message}"`);
	});
	
};



module.exports = {
	getAccessories,
	getAccessoryById,
	postCreateAccessory,
	getCreateAccessory
};
