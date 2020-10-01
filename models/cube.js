const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
module.exports = class Cube {
	constructor(name, description, imageUrl, difficulty) {
		this.id = uuidv4();
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
		this.difficulty = difficulty;
	}
	save() {
		const pathToDB = path.resolve('./config/database.json');
		let cubes;
		fs.readFile(pathToDB, { encoding: 'utf-8' }, (err, data) => {
			if (err) {
				throw err;
			}
			cubes = JSON.parse(data);
			cubes.push(this);
			fs.writeFile(pathToDB, JSON.stringify(cubes), (err) => {
				if (err) {
					throw err;
				}
				console.log('Successfully stored cube');
			});
		});
	}
};
