const crypto = require('crypto');

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
            var salt = createSalt();

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
                    var userPassword = hashPassword(password, salt);
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

//creates a random Salt
function createSalt(){
    return crypto.randomBytes(16).toString('hex');
}

//creates password hash
function hashPassword(pw, salt){
    return crypto.pbkdf2Sync(pw, salt, 1000, 64, `sha256`).toString('hex');
}