const router = require('express').Router();

const paymentHistoryController = require('../../controllers/PaymentHistoryController');


//routes for paymentHistory
router.delete('/delete/:id', paymentHistoryController.delete);

router.get('/get', paymentHistoryController.get);

router.put('/update/:id', paymentHistoryController.update);

router.get('/getById/:id', paymentHistoryController.getById);

router.post('/create', paymentHistoryController.create)

module.exports = router;
