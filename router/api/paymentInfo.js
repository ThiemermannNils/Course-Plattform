const router = require('express').Router();

const paymentController = require('../../controllers/PaymentInfoController');

//routes for paymentHistory
router.delete('/delete/:id', paymentController.delete);

router.get('/get', paymentController.get);

router.put('/update/:id', paymentController.update);

router.get('/getById/:id', paymentController.getById);

router.post('/create', paymentController.create)

module.exports = router;
