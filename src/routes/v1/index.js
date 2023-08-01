const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const reportingRoute = require('./reporting.route');
const statRoute = require('./stat.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/reportings', reportingRoute);
router.use('/reportings/stats', statRoute);

module.exports = router;
