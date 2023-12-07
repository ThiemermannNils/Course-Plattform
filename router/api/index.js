const router = require('express').Router();

router.use('/email', require('./sendEmail'));

router.use('/auth', require('./auth'));

router.use('/user', require('./user'));

router.use('/author', require('./author'));

router.use('/paymentHistory', require('./paymentHistory'));

router.use('/category', require('./category'));

router.use('/salesoffer', require('./salesoffer'));

router.use('/course', require('./course'));

router.use('/video', require('./video'));

router.use('/paymentInfo', require('./paymentInfo'));

router.use('/courseProgress', require('./courseProgress'));

module.exports = router;
