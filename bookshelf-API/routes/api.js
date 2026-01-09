const controller = require('../controllers/BookController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Express');
})

// craete book
router.post('/books', controller.createBook);

// get all books
router.get('/books', controller.getAllBooks);

// get detail book
router.get('/books/:bookId', controller.getDetailBook);

// update book
router.put('/books/:bookId', controller.updateBook);

// delete book
router.delete('/books/:bookId', controller.deleteBook);

module.exports = router;