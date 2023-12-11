const router = require('express').Router();

const courseProgressController = require('../../controllers/CourseProgressController');

//routes for paymentHistory
router.delete('/delete/:id', courseProgressController.delete);

router.get('/get', courseProgressController.get);

router.put('/update/:id', courseProgressController.update);

router.get('/getById/:id', courseProgressController.getById);

router.post('/create', courseProgressController.create)

module.exports = router;
