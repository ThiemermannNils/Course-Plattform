const router = require('express').Router();

const salesoffersController = require('../../controllers/SalesOfferController');


//routes for paymentHistory
router.delete('/delete/:id', salesoffersController.delete);

router.get('/get', salesoffersController.get);

router.put('/update/:id', salesoffersController.update);

router.get('/getById/:id', salesoffersController.getById);

router.post('/create', salesoffersController.create)

module.exports = router;
