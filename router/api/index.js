

const router = require('express').Router();

router.use('/email', require('./sendEmail'));

router.use('/', require('./auth'));

module.exports = router;
