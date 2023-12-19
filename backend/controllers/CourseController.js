var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var Course = model.Models.tbl_course;

    //create course obj
    const course = {
        id: null,
        title: req.body.title,
        cost: req.body.cost,
        Language: req.body.language,
        tbl_author_id: req.body.author_id,
        fk_category_id: req.body.category_id
    }

    //create new course in db
    Course.create(course)
    .then((data)=>{
        if(data){
            return res.status(200).json({message: "successfully created", data: data});
        }else{
            return res.status(400).json({message: "Failed to create"})
        }
    })
        
}

exports.get = function(req, res, next){

    var Course = model.Models.tbl_course;

    //get all course
    Course.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "courses fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No course found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){

    var Course = model.Models.tbl_course;

    const id = req.params.id;

    Course.findByPk(id)
    .then((course)=>{
        console.log(course);
        if(course){
            return res.status(200).json({message: "Successfully fetched", data: course});
        }else{
            return res.status(400).json({message: "course with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    
    var Course = model.Models.tbl_course;

    //get id form request
    const id = req.params.id;

    //delete course
    Course.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "course deleted successfully"});
        } else{
            return res.status(404).json({ message: "course not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    
    var Course = model.Models.tbl_course;

    //get id from request
    const id = req.params.id;

    //check if exists
    Course.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "course updated", data: updated});
                }else{
                    return res.status(400).json({message: "course not updated"});
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