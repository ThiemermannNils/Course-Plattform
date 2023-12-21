const router = require('express').Router()

const authorController = require('../../controllers/AuthorController');

router.get('/get', authorController.getAuthors);

router.post('/create', authorController.createAuthor);

router.get('/getById/:id', authorController.getAuthorsById);

router.put('/update/:id', authorController.updateAuthor);

router.delete('/delete/:id', authorController.deleteAuthor);

module.exports = router;