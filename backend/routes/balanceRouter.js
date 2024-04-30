const express = require('express');
const { getBalance, transferTransaction } = require('../controllers/balanceController');
const { tokenValidator } = require('../middleware/jwtMiddleware');

const router = express.Router();

//add token validator
router.get('/', getBalance);
router.post('/transfer', tokenValidator, transferTransaction);

module.exports = router;