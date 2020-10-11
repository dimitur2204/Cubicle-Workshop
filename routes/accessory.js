const express = require('express');
const router = express.Router();

const accController = require('../controllers/accessory');

router.get('/create/accessory', accController.getCreateAccessory);
router.post('/create/accessory', accController.postCreateAccessory);

module.exports = router;