const router = require('express').Router();

const categoryController = require('../../controllers/CategoryController');


//routes for paymentHistory
router.delete('/delete/:id', categoryController.delete);

router.get('/get', categoryController.get);

router.put('/update/:id', categoryController.update);

router.get('/getById/:id', categoryController.getById);

router.post('/create', categoryController.create)

module.exports = router;
