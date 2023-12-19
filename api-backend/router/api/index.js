const router = require('express').Router();

const auth = require('../../controllers/AuthController');

router.use('/email', require('./sendEmail'));

router.use('/auth', require('./auth'));

router.use('/user', auth.isLoggedIn, require('./user'));

router.use('/author', auth.isLoggedIn, require('./author'));

router.use('/paymentHistory', auth.isLoggedIn, require('./paymentHistory'));

router.use('/category', auth.isLoggedIn, require('./category'));

router.use('/salesoffer', auth.isLoggedIn, require('./salesoffer'));

router.use('/course', auth.isLoggedIn, require('./course'));

router.use('/video', auth.isLoggedIn, require('./video'));

router.use('/paymentInfo', auth.isLoggedIn, require('./paymentInfo'));

router.use('/courseProgress', auth.isLoggedIn, require('./courseProgress'));

module.exports = router;
