var bCrypt = require('bcrypt');

module.exports = function(passport, user){
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, username, password, done){
            var salt = bCrypt.genSalt(8);

            var generateHash = function(password) {
                return bCrypt.hashSync(password, salt, null)
            };

            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if(user)
                {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else
                {
                    var userPassword = generateHash(password);
                    var data = 
                        {
                            username: username,
                            email: req.body.email,
                            password: userPassword,
                            salt: salt,
                            admin: 0,
                        };
                    User.create(data).then(function(newUser, created){
                        if(!newUser){
                            return done(null, false);
                        }
                        if(newUser){
                            return done(null, newUser);
                        }
                    });
                }
            });
        },
    ));

    //serialize 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}