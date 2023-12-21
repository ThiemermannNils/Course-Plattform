var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var Video = model.Models.tbl_video_data;

    //create payment obj
    const videos = {
        id: null,
        title: req.body.title,
        description: req.body.description,
        video_name: req.body.video_name,
        video_length: req.body.video_length,
        fk_course_id: req.body.course_id
    }

    //create new payment in db
    Video.create(videos)
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

    var Video = model.Models.tbl_video_data;

    //get all payments
    Video.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "Videos fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No video found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    
    var Video = model.Models.tbl_video_data;

    const id = req.params.id;

    Video.findByPk(id)
    .then((data)=>{
        console.log(data);
        if(data){
            return res.status(200).json({message: "Successfully fetched", data: data});
        }else{
            return res.status(400).json({message: "Video with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    
    var Video = model.Models.tbl_video_data;

    //get id form request
    const id = req.params.id;

    //delete User
    Video.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "Video deleted successfully"});
        } else{
            return res.status(404).json({ message: "Video not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    
    var Video = model.Models.tbl_video_data;

    //get id from request
    const id = req.params.id;

    //check if exists
    Video.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "Video updated", data: updated});
                }else{
                    return res.status(400).json({message: "Video not updated"});
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