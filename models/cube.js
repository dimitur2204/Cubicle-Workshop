const { v4: uuidv4 } = require('uuid');
const db = require('../controllers/database');
module.exports = class Cube {
	constructor(name, description, imageUrl, difficulty) {
		this.id = uuidv4();
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
		this.difficulty = difficulty;
	}
	save() {
		db.addNewCube(this);
	}
};
