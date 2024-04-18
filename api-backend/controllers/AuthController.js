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
    console.log(req.session);
    req.session.destroy();

    console.log("After destroy", req.session);

    return res.json({ logedout: true, message: "User successfully loged out" });
}

/*
//Check if user is logged in
exports.isLoggedIn = function(req, res, next) {

    //check if Authenticated
    if (req.isAuthenticated())
        
        //if authenticated continue 
        return next();

    return res.json({message: "no user is loggedin"})
}
*/
exports.isAdmin = function(req, res,next){
 return
}