var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var Payment = model.Models.tbl_payment_info;

    //create payment obj
    const payment = {
        id: null,
        amount_total: req.body.amount_total,
        paid: req.body.paid,
        receipt: req.body.receipt,
        receipt_link: req.body.receipt_link,
        fk_course_id: req.body.course_id,
        fk_user_id: req.body.user_id
    }

    //create new payment in db
    Payment.create(payment)
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

    var Payment = model.Models.tbl_payment_info;

    //get all payments
    Payment.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "Payment fetched Successfully", data: result});
        }else{
            return res.status(400).json({message: "No video found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    
    var Payment = model.Models.tbl_payment_info;

    const id = req.params.id;

    Payment.findByPk(id)
    .then((data)=>{
        console.log(data);
        if(data){
            return res.status(200).json({message: "Successfully fetched", data: data});
        }else{
            return res.status(400).json({message: "Payment with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    
    var Payment = model.Models.tbl_payment_info;

    //get id form request
    const id = req.params.id;

    //delete User
    Payment.destroy({
        where: {
            id:id
        }
    }).then((result)=>{
        console.log(result);
        if(result){
            return res.status(200).json({ message: "Payment deleted successfully"});
        } else{
            return res.status(404).json({ message: "Payment not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    
    var Payment = model.Models.tbl_payment_info;

    //get id from request
    const id = req.params.id;

    //check if exists
    Payment.findOne({
        where:{
            id: id
        }
    }).then((data)=>{
        if(data){
            data.update({...req.body}, {where:{id:id}})
            .then((updated)=>{
                if (updated) {
                    return res.status(200).json({message: "Payment updated", data: updated});
                }else{
                    return res.status(400).json({message: "Payment not updated"});
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