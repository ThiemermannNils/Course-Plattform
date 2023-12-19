const router = require('express').Router();

const courseController = require('../../controllers/CourseController');


//routes for paymentHistory
router.delete('/delete/:id', courseController.delete);

router.get('/get', courseController.get);

router.put('/update/:id', courseController.update);

router.get('/getById/:id', courseController.getById);

router.post('/create', courseController.create)

module.exports = router;
