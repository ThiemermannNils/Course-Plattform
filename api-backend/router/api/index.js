const router = require('express').Router();
const passport = require('passport');

const auth = require('../../controllers/AuthController');

router.use('/auth', require('./auth'));

router.use('/user', passport.authenticate('jwt', { session: false }), require('./user'));

router.use('/author', passport.authenticate('jwt', { session: false }), require('./author'));

router.use('/paymentHistory', passport.authenticate('jwt', { session: false }), require('./paymentHistory'));

router.use('/category', passport.authenticate('jwt', { session: false }), require('./category'));

router.use('/salesoffer', passport.authenticate('jwt', { session: false }), require('./salesoffer'));

router.use('/course', passport.authenticate('jwt', { session: false }), require('./course'));

router.use('/video', passport.authenticate('jwt', { session: false }), require('./video'));

router.use('/paymentInfo', passport.authenticate('jwt', { session: false }), require('./paymentInfo'));

router.use('/courseProgress', passport.authenticate('jwt', { session: false }), require('./courseProgress'));

module.exports = router;
