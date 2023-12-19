var exports = module.exports = {};

var model = require("../server/index");


exports.create = function (req, res, next) {

    var Payment = model.Models.tbl_payment_history;

    //create payment obj
    const payments = {
        id: null,
        amount_total: req.body.amount_total,
        paid: req.body.paid,
        receipt: req.body.receipt,
        receipt_link: req.body.receipt_link,
        fk_user_id: req.body.user_id
    }

    //create new payment in db
    Payment.create(payments)
    .then((newPayment)=>{
        if(newPayment){
            return res.status(200).json({message: "successfully created", newPayment: newPayment});
        }else{
            return res.status(400).json({message: "Failed to create"})
        }
    })
        
}

exports.get = function(req, res, next){

    var Payment = model.Models.tbl_payment_history;

    //get all payments
    Payment.findAll()
    .then((result)=>{
        console.log(result);
        //return the results 
        if(result){
            return res.status(200).json({message: "payments fetched Successfully", payment: result});
        }else{
            return res.status(400).json({message: "No payment found"});
        }
        //catch errors
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.getById = function(req, res, next){
    var Payment = model.Models.tbl_payment_history;

    const id = req.params.id;

    Payment.findByPk(id)
    .then((payment)=>{
        console.log(payment);
        if(payment){
            return res.status(200).json({message: "Successfully fetched", data: payment});
        }else{
            return res.status(400).json({message: "payment with that id not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({error:error});
    })
}

exports.delete = function(req, res, next){
    var Payment = model.Models.tbl_payment_history;

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
            return res.status(200).json({ message: "payment deleted successfully"});
        } else{
            return res.status(404).json({ message: "payment not found"});
        }
    }).catch((error)=>{
        return res.status(500).json({message: "Error", error: error});
    });
}

exports.update = function(req, res, next){
    var Payment = model.Models.tbl_payment_history;

    //get id from request
    const id = req.params.id;

    //check if exists
    Payment.findOne({
        where:{
            id: id
        }
    }).then((payment)=>{
        if(payment){
            payment.update({...req.body}, {where:{id:id}})
            .then((updatedpayment)=>{
                if (updatedpayment) {
                    return res.status(200).json({message: "payment updated", payment: updatedpayment});
                }else{
                    return res.status(400).json({message: "payment not updated"});
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