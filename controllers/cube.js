const Cube = require('../models/cube-model');
const accController = require('../controllers/accessory');

const getCubes = async (req,res,next) => {
	const query = req.query;
	const search = query.search;
	const from = Number(query.from);
	const to = Number(query.to);
	Cube.find({
		name: {
			$regex: new RegExp(search, 'i') || '.*',
		},
		difficulty: {
			$gte: from || 0,
			$lte: to || Number.MAX_SAFE_INTEGER,
		},
	}).then((cubes) => {
		res.render('index', { cubes });
	}).catch(next);
	
};


const getCubeDetails = async (req,res,next) => {
	try{
		const id = req.params.id;
		const cube = await Cube.findById(id);
		const accessories = await getAccessoriesForCube(id);
		res.render('details', { cube, accessories });
	}catch(error){
		next(error);
	}
};


const getCreateCube = (_, res) => {
	res.render('create');
};

const postCreateCube = (req,res,next) => {
	const {
	name,
	description,
	imageUrl,
	difficulty
} = req.body;
	const cube = new Cube({
		name,
		description,
		imageUrl,
		difficulty,
	});
	cube.save().then(() => {
		res.redirect('/');
	}).catch(next);
};

const getAccessoriesForCube = async (cubeId) => {
	const cube = await Cube.findById(cubeId);
	await cube.populate('accessories').execPopulate();
	return cube.accessories;
};

const getAttachAccessories = async (req,res,next) => {
	try {
		const id = req.params.id;
		const cube = await Cube.findById(id);
		const cubeAccIdsStrings = cube.accessories.map((acc) =>
			acc.valueOf().toString()
		);
		const allAccessories = await accController.getAccessories();
		const unaatachedAccessories = allAccessories.filter(
			(acc) => {
				return !cubeAccIdsStrings.includes(acc._id.valueOf().toString());
			}
		);
		const areThereAcc = !!unaatachedAccessories.length;
		res.render('attachAccessory', { cube, unaatachedAccessories, areThereAcc });
	} catch (error) {
		next(error);
	}
}

const getDeleteCube = (req,res,next) =>{
		const id = req.params.id;
		Cube.findById(id).then((cube) => {
			res.render('delete', cube);
		}).catch(next);
}

const postDeleteCube = (req,res,next) =>{
	const id = req.params.id;
	Cube.findByIdAndRemove(id).then(cube=>{
		res.redirect('/');
	}).catch(next);
}

const postAttachAccessory = async (req,res,next) => {
	const cubeId = req.params.id;
	const accId = req.body.accId;
	const accessory = await accController.getAccessoryById(accId);
	Cube.findByIdAndUpdate(cubeId, {
		$addToSet: { accessories: accessory },
	}).then((cube) => {
		cube.save(() => {
			res.redirect(`/details/${cubeId}`);
		})
	}).catch(next);
};

const getEditCube = (req,res,next) => {
	const cubeId = req.params.id;
	Cube.findById(cubeId).then(cube => {
		res.render('edit', cube);
	}).catch(next);
}

const postEditCube = (req,res,next) => {
	const id = req.params.id;
	const {
		name,
		description,
		imageUrl,
		difficulty
	} = req.body;
		Cube.findByIdAndUpdate(id,{name, description,imageUrl,difficulty}).then((cube) => {
			cube.save();
			res.redirect('/');
		}).catch(next);
}

module.exports = {
	getCubes,
	getCubeDetails,
	getCreateCube,
	postCreateCube,
	getAccessoriesForCube,
	getAttachAccessories,
	postAttachAccessory,
	getDeleteCube,
	postDeleteCube,
	getEditCube,
	postEditCube
};
