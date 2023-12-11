const crypto = require('crypto');

module.exports = function(passport, user){
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

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


    // Configure Passport's LocalStrategy for user signup
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // Passes the request to the callback function
        },

        // Callback function handling user signup
        function(req, username, password, done){
            // Generating a salt for password hashing
            var salt = createSalt();

            // Check if the username already exists in the database
            User.findOne({
                where: {
                    username: req.body.username
                }
            }).then(function(user) {
                console.log(user);
                if(user)
                {
                    // Username already exists, return an error message
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else
                {
                    // Create a hashed password using the provided password and salt
                    var userPassword = hashPassword(req.body.password, salt);
                    // Prepare user data to be inserted into the database
                    var data = 
                        {
                            username: req.body.username,
                            email: req.body.email,
                            password: userPassword,
                            salt: salt,
                            admin: 0,
                        };
                    // Create a new user in the database
                    User.create(data).then(function(newUser, created){
                        if(!newUser){
                            // If user creation fails, return null
                            return done(null, null);
                        }
                        if(newUser){
                            // If user is successfully created, return the new user object
                            return done(null, newUser);
                        }
                    });
                }
            });
        },
    ));


    // Configure Passport's LocalStrategy for user signin
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },  
    
    // Callback function handling user signin
    function (req, username, password, done) {
        
        //check if user exists
        User.findOne({
            where: {
                username: username
            }
        }).then(function (user){

            console.log("Line 97: ", user);

            if(!user){
                return done(null, false, {
                    message: 'Username does not exist'
                });
            }

            //check if password is correct
            if(!verifyPassword(user.password, user.salt, password)) {
                return done(null, false, {
                    message: 'password incorrect'
                });
            }

            //pass user data to Request
            var userinfo = user.get();

            console.log("Line 115:", userinfo);

            return done(null, userinfo);
        
        //catch Error
        }).catch(function(err){
            console.log("Error: ", err);

            return done(null, false, {
                message: 'Something went wrong with your signin.'
            });
        });
    }
    
    ))
}

//creates a random Salt
function createSalt(){
    return crypto.randomBytes(16).toString('hex');
}

//creates password hash
function hashPassword(pw, salt){
    return crypto.pbkdf2Sync(pw.toString(), salt, 1000, 64, `sha256`).toString('hex');
}

//verifys Password 
function verifyPassword(userPw, userSalt, pw){
    pwhash = crypto.pbkdf2Sync(pw.toString(), userSalt, 1000, 64, `sha256`).toString('hex');

    return pwhash === userPw;
}