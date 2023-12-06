const router = require('express').Router();

const userController = require('../../controllers/UserController');

router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
