var exports = module.exports = {}
exports.signup = function(req, res) {
    return res.json({message: "successfull sigend up"});
}
exports.signin = function(req, res) {
    return res.json({message: "successfull sigend in"});
}
   
exports.dashboard = function(req, res) {
    return res.json({message: "successful"});
}
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
    });

    return res.json({ message: "User successfully loged out" });
}

//Check if user is logged in
exports.isLoggedIn = function(req, res, next) {

    //check if Authenticated
    if (req.isAuthenticated())
        
        //if authenticated continue 
        return next();
        
    return res.json({message: "no user is loggedin"})
}

exports.isAdmin = function(req, res,next){
 return
}