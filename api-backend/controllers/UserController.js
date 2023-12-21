/*
    !Autor: Nils Thiemermann
    ?Date: 07.12.2023

    * UserController Handles HTTP requests like post, get, put, delete for the URL .../user/..
    * it will respond with a Json mostly with a Message and a Status code
*/

var exports = module.exports = {};

var model = require("../server/index");

exports.deleteUser = async function(req, res, next){
    var User = model.Models.tbl_users;

    console.log(User);
    // get Id from params
    const id = req.params.id;

    // delete user with Id
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

exports.readUser = function(req, res, next){
    var User = model.Models.tbl_users

    // get all User from db
    User.findAll().then((result) => {
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "Users fetched Successfully", users: result});
        }else{
            return res.status(400).json({message: "No Users found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.updateUser = function(req, res, next){
    var User = model.Models.tbl_users;

    //get Id from request
    const id = req.params.id;

    //find user by id
    var user =  User.findOne({
        where: {
            id: id
        }
    });

    if(user){
        User.update({ ...req.body }, { where: {id:id}})
        .then((result) => {
            console.log(result);
            if(result === 1){
                return res.status(200).json({message: "Successfull Updated"});
            }else{
                return res.status(400).json({message: "user not found"});
            }
        }).catch((error) => {
            return res.status(500).json({error: error});
        })
    }else{
        return res.status(400).json({message: "No user with that Id"});
    };
}

exports.getUserById = function(req, res, next){
    var User = model.Models.tbl_users;

    //get Id from request
    const id = req.params.id;

    //find User by id
    User.findByPk(id)
    .then((result) => {
        console.log(result);

        //check if result is not null
        if(result){
            return res.status(200).json({message:"Successfully found", user: result});
        }else{
            return res.status(400).json({message: "user not found"});
        }
    }).catch((error) => {
        return res.status(500).json({error: error});
    });

}