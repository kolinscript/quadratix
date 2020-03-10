const express       = require('express');
const router        = express.Router();
const calculate     = require('./calculate.js');

router.use('/', calculate);

module.exports = router;