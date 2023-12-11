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
}