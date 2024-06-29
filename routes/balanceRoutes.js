const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.get('/balance', balanceController.getBalance);
router.post('/deposit', balanceController.depositBalance);

module.exports = router;
