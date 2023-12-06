

const router = require('express').Router();

router.use('/email', require('./sendEmail'));

router.use('/auth', require('./auth'));

router.use('/user', require('./user'));

router.get('/status', (req, res) => {
    return res.status(200).json({ message: "Success"});
});

module.exports = router;
