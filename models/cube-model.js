const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
		maxlength: 150,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	difficulty: {
		type: Number,
		required: true,
		min: 0,
		max: 6,
	},
	accessories: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Accessory',
		},
	],
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
