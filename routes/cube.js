const express = require('express');
const router = express.Router();
const cubeController = require('../controllers/cube');

router.get('/', cubeController.getCubes);

router.get('/attach/accessory/:id', cubeController.getAttachAccessories);
router.post('/attach/accessory/:id', cubeController.postAttachAccessory);

router.get('/details/:id', cubeController.getCubeDetails);

router.get('/delete/:id',cubeController.getDeleteCube);
router.post('/delete/:id', cubeController.postDeleteCube);

router.get('/create', cubeController.getCreateCube);
router.post('/create', cubeController.postCreateCube);

router.get('/edit/:id', cubeController.getEditCube);
router.post('/edit/:id', cubeController.postEditCube);

module.exports = router;

