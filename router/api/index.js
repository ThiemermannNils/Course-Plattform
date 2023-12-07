

const router = require('express').Router();

router.use('/email', require('./sendEmail'));

router.use('/auth', require('./auth'));

router.use('/user', require('./user'));

router.use('/author', require('./author'));

router.use('/paymentHistory', require('./paymentHistory'));

router.use('/category', require('./category'));

module.exports = router;
