const router = require('express').Router();

router.use('/', require('./robots'));
router.use('/', require('./incomeData'));

module.exports = router;
