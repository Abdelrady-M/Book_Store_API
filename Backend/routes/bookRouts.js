const express = require('express');
const router = express.Router()
const { getAllBooks, saveNewBook, getBookById, updateBook, deleteBook } = require('../controllers/book')



router.route('/').get(getAllBooks).post(saveNewBook)
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook)
module.exports = router