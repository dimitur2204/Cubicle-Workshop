const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true,'You should provide a name'],
	},
	imageUrl: {
		type: String,
		required: [true,'You should provide an imageUrl'],
	},
	description: {
		type: String,
		required: [true,'You should provide a description'],
		maxlength: [150,'Max length is 150 symbols'],
	},
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;
