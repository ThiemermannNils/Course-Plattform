var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var SalesOffer = model.Models.tbl_sales_offer;

    //create payment obj
    const sales = {
        id: null,
        sale_percentage: req.body.sale_percentage,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        bonus_code: req.body.bonus_code,
        fk_course_id: req.body.course_id
    }

    //create new payment in db
    SalesOffer.create(sales)
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

    var SalesOffer = model.Models.tbl_sales_offer;

    //get all payments
    SalesOffer.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "salesoffers fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No category found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    var SalesOffer = model.Models.tbl_sales_offer;

    const id = req.params.id;

    SalesOffer.findByPk(id)
    .then((category)=>{
        console.log(category);
        if(category){
            return res.status(200).json({message: "Successfully fetched", data: category});
        }else{
            return res.status(400).json({message: "salesoffers with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    var SalesOffer = model.Models.tbl_sales_offer;

    //get id form request
    const id = req.params.id;

    //delete User
    SalesOffer.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "saleoffers deleted successfully"});
        } else{
            return res.status(404).json({ message: "saleoffers not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    var SalesOffer = model.Models.tbl_sales_offer;

    //get id from request
    const id = req.params.id;

    //check if exists
    SalesOffer.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "saleoffers updated", data: updated});
                }else{
                    return res.status(400).json({message: "saleoffers not updated"});
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