const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
*/

router.post('/signin', async (req, res, next) => {
  passport.authenticate('local-signin', async (err, userinfo, info) => {
        try {
          if (err || !userinfo) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            userinfo,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: userinfo.id, username: userinfo.username };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token: token, id: userinfo.id, admin:userinfo.admin});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

router.get("/dashboard", passport.authenticate('jwt', {session: false}), authController.dashboard)

router.get('/logout', passport.authenticate('jwt', {session: false}), authController.logout);

module.exports = router;
