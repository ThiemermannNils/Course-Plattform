var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var CourseProgress = model.Models.tbl_course_progress;

    //create payment obj
    const courseProgress = {
        id: null,
        progress_in_percentage: req.body.progress_in_percentage,
        fk_course_id: req.body.course_id,
        fk_users_id: req.body.user_id
    }

    //create new payment in db
    CourseProgress.create(courseProgress)
    .then((data)=>{
        if(data){
            return res.status(200).json({message: "successfully created", data: data});
        }else{
            return res.status(400).json({message: "Failed to create"})
        }
    }).catch((error)=>{
        return res.json({error: error})
    })
        
}

exports.get = function(req, res, next){

    var CourseProgress = model.Models.tbl_course_progress;

    //get all payments
    CourseProgress.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "Course progress fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No video found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    
    var CourseProgress = model.Models.tbl_course_progress;

    const id = req.params.id;

    CourseProgress.findByPk(id)
    .then((data)=>{
        console.log(data);
        if(data){
            return res.status(200).json({message: "Successfully fetched", data: data});
        }else{
            return res.status(400).json({message: "Course progress with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    
    var CourseProgress = model.Models.tbl_course_progress;

    //get id form request
    const id = req.params.id;

    //delete User
    CourseProgress.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "Course Progress deleted successfully"});
        } else{
            return res.status(404).json({ message: "Course Progress not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    
    var CourseProgress = model.Models.tbl_course_progress;

    //get id from request
    const id = req.params.id;

    //check if exists
    CourseProgress.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "Course progress updated", data: updated});
                }else{
                    return res.status(400).json({message: "Course progress not updated"});
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