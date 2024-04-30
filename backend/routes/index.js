const express = require('express');
const userRouter = require('./userRoutes');
const balanceRouter = require('./balanceRouter');

const router = express.Router();
router.use('/user', userRouter);
router.use('/balance', balanceRouter);

module.exports = router;