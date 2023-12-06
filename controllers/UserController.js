var exports = module.exports = {};

var model = require("../server/index");


exports.deleteUser = async function(req, res, next){
    var User = model.Models.tbl_users;

    console.log(User);
    //get Id from params
    const id = req.params.id;

    //delete user with Id
    User.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        console.log(result);
        if(result){
            return res.status(200).json({ message: "User deleted successfully"});
        } else{
            return res.status(404).json({ message: "User not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}