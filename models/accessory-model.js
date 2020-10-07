const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
		maxlength: 150,
	},
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;