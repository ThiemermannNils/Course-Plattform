const router = require('express').Router();

const userController = require('../../controllers/UserController');


//routes for user
router.delete('/delete/:id', userController.deleteUser);

router.get('/get', userController.readUser);

router.put('/update/:id', userController.updateUser);

router.get('/getById/:id', userController.getUserById);

module.exports = router;
