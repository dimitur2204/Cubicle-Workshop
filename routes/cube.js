const express = require('express');
const router = express.Router();
const cubeController = require('../controllers/cube');
const {requireAuth} = require('../middleware/auth-middleware');

router.get('/', cubeController.getCubes);

router.get('/attach/accessory/:id', requireAuth, cubeController.getAttachAccessories);
router.post('/attach/accessory/:id', requireAuth, cubeController.postAttachAccessory);

router.get('/details/:id', cubeController.getCubeDetails);

router.get('/delete/:id', requireAuth, cubeController.getDeleteCube);
router.post('/delete/:id', requireAuth, cubeController.postDeleteCube);

router.get('/create', requireAuth, cubeController.getCreateCube);
router.post('/create', requireAuth, cubeController.postCreateCube);

router.get('/edit/:id', requireAuth, cubeController.getEditCube);
router.post('/edit/:id', requireAuth, cubeController.postEditCube);

module.exports = router;

