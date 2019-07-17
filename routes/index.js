const router = require('express').Router();

router.use('/', require('./Robots'));
router.use('/', require('./IncomeData'));

module.exports = router;
