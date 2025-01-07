const express = require('express');
const router = express.Router();
const {getBooks, createBook, deleteBook, getBookById, updateBook} = require('../controllers/bookController');
const {createBookValidationRules, validate, updateBookValidationRules} = require('../middlewares/validationMiddlewares')
const multer = require('multer');

const upload = multer({dest: 'uploads/'})

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', upload.single('image'), createBookValidationRules(), validate, createBook);
router.delete('/:id', deleteBook);
router.put('/:id', updateBookValidationRules(), validate, updateBook);
module.exports = router;