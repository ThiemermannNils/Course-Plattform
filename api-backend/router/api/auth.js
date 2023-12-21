const router = require('express').Router();
const passport = require('passport');

const authController = require('../../controllers/AuthController');

router.post("/signup", passport.authenticate("local-signup"), (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.status(200).json({message: "User successfully created", username: req.user.dataValues.username, session: req.session});
      //res.redirect('/admin/gifts?filter=review');
    }
    if (!req.user) {
      res.status(500).json({message: "User failed to create"});
    }
  });

/*
router.post("/signup", passport.authenticate('local-signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    
  }), (req, res) => {

    console.log("In the function")

    if (req.user.isAdmin === true) {
      res.redirect('/admin/gifts?filter=review');
    }
    if (req.user.isAdmin === false) {
      res.redirect('/dashboard/received');
    }
  }
);
*/

router.post("/signin", passport.authenticate('local-signin'), (req, res) => {
  if (req.user) {
    console.log(req.session);
    res.status(200).json({message: "User successfully logedin", session: req.session, success: true});
    //res.redirect('/admin/gifts?filter=review');
  }
  if (!req.user) {
    res.status(500).json({message: "User failed to login", success: false});
  }
});

router.get("/dashboard", authController.isLoggedIn, authController.dashboard)

router.get('/logout', authController.isLoggedIn ,authController.logout);

module.exports = router;
