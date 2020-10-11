const express = require('express');
const router = express.Router();
const accController = require('../controllers/accessory');
const {requireAuth} = require('../middleware/auth-middleware');

router.get('/create/accessory', requireAuth, accController.getCreateAccessory);
router.post('/create/accessory', requireAuth, accController.postCreateAccessory);

module.exports = router;