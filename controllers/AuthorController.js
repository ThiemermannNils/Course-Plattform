var exports = module.exports = {};

var model = require("../server/index");


exports.createAuthor = function (req, res, next) {

    var Author = model.Models.tbl_author;

    //check if author exists
    Author.findOne({
        where:{
            fk_users_id: req.body.user_id
        }
    }).then((author)=>{
        console.log(author);
        if(author){
            return res.status(400).json({message: "Author already exists"});
        }else{
             //create Author obj
            const author = {
                id: null,
                name: req.body.name,
                firstname: req.body.firstname,
                description: req.body.description,
                fk_users_id: req.body.user_id
            }

            //create new Author in db
            Author.create(author)
            .then((newAuthor)=>{
                if(newAuthor){
                    return res.status(200).json({message: "successfully created", newAuthor: newAuthor});
                }else{
                    return res.status(400).json({message: "Failed to create"})
                }
            })
        }
    }).catch((error)=>{
        return res.json({error: error});
    });
}

exports.getAuthors = function(req, res, next){

    var Author = model.Models.tbl_author;

    //get all Authors
    Author.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "Authors fetched Successfully", users: result});
        }else{
            return res.status(400).json({message: "No Author found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getAuthorsById = function(req, res, next){
    var Author = model.Models.tbl_author;

    const id = req.params.id;

    Author.findByPk(id)
    .then((author)=>{
        console.log(author);
        if(author){
            return res.status(200).json({message: "Successfully fetched", data: author});
        }else{
            return res.status(400).json({message: "Author with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.deleteAuthor = function(req, res, next){
    var Author = model.Models.tbl_author;

    //get id form request
    const id = req.params.id;

    //delete User
    Author.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "Author deleted successfully"});
        } else{
            return res.status(404).json({ message: "Author not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.updateAuthor = function(req, res, next){
    var Author = model.Models.tbl_author;

    //get id from request
    const id = req.params.id;

    //check if exists
    Author.findOne({
        where:{
            id: id
        }
    }).then((author)=>{
        if(author){
            Author.update({...req.body}, {where:{id:id}})
            .then((updatedAuthor)=>{
                if (updatedAuthor) {
                    return res.status(200).json({message: "Author updated", author: updatedAuthor});
                }else{
                    return res.status(400).json({message: "Author not updated"});
                }
            }).catch((error)=>{
                return res.status(500).json({error: error});
            })
        }
    }).catch((error)=>{
        return res.status(500).json({error: error});
    })
}