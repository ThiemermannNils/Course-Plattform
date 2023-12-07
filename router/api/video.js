const router = require('express').Router();

const videoController = require('../../controllers/VideoController');

//routes for paymentHistory
router.delete('/delete/:id', videoController.delete);

router.get('/get', videoController.get);

router.put('/update/:id', videoController.update);

router.get('/getById/:id', videoController.getById);

router.post('/create', videoController.create)

module.exports = router;
