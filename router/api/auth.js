const router = require('express').Router();
const passport = require('passport');

const authController = require('../../controllers/AuthController');


router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
}))

router.post("/signin")

router.get("/dashboard", isLoggedIn, authController.dashboard)

router.get('/logout',authController.logout);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    
        return next();
        
    res.redirect('/signin');
}

module.exports = router;
