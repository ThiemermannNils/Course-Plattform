var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var Category = model.Models.tbl_category;

    //create payment obj
    const categories = {
        id: null,
        name: req.body.name
    }

    //create new payment in db
    Category.create(categories)
    .then((data)=>{
        if(data){
            return res.status(200).json({message: "successfully created", data: data});
        }else{
            return res.status(400).json({message: "Failed to create"})
        }
    })
        
}

exports.get = function(req, res, next){

    var Category = model.Models.tbl_category;

    //get all payments
    Category.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "category fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No category found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    var Category = model.Models.tbl_category;

    const id = req.params.id;

    Category.findByPk(id)
    .then((category)=>{
        console.log(category);
        if(category){
            return res.status(200).json({message: "Successfully fetched", data: category});
        }else{
            return res.status(400).json({message: "category with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    var Category = model.Models.tbl_category;

    //get id form request
    const id = req.params.id;

    //delete User
    Category.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "category deleted successfully"});
        } else{
            return res.status(404).json({ message: "category not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    var Category = model.Models.tbl_category;

    //get id from request
    const id = req.params.id;

    //check if exists
    Category.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "category updated", data: updated});
                }else{
                    return res.status(400).json({message: "category not updated"});
                }
            }).catch((error)=>{
                return res.status(500).json({error: error});
            })
        }else{
            return res.status(404).json({message:"Id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error: error});
    })
}