const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	difficulty: {
		type: Number,
		required: true,
	},
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
