const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/devices', deviceController.createDevice);
router.get('/devices', deviceController.getAllDevices);
router.get('/devices/:id', deviceController.getDeviceById);
router.patch('/devices/:id', deviceController.updateDevice);
router.delete('/devices/:id', deviceController.deleteDevice);

module.exports = router; 