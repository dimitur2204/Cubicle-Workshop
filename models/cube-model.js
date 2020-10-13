const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true,'You should provide a name'],
	},
	description: {
		type: String,
		required: [true,'You should provide a description'],
		maxlength: [150,'Max length for description is 150 symbols'],
	},
	imageUrl: {
		type: String,
		required: [true,'You should provide an imageUrl'],
	},
	difficulty: {
		type: Number,
		required: [true,'You should provide a difficulty'],
		min: [1,'Difficulty cannot be less than 1'],
		max: [6,'Difficulty cannot be more than 6'],
	},
	accessories: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Accessory',
		},
	],
	creatorId:{
		type:String,
		required:true
	}
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
