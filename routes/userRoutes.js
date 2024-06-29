const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getUserInfo);
router.post('/user/car', userController.addCar);

module.exports = router;
