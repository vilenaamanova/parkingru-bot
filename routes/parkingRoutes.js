const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.get('/parking/:id', parkingController.getParkingZone);
router.post('/extendParking', parkingController.extendParking);
router.post('/endParking', parkingController.endParking);

module.exports = router;
