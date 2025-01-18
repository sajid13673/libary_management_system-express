const express = require('express');
const router = express.Router();
const {getBooks, createBook, deleteBook, getBookById, updateBook, getBooksStats} = require('../controllers/bookController');
const {createBookValidationRules, validate, updateBookValidationRules} = require('../middlewares/validationMiddlewares')
const multer = require('multer');

const upload = multer({dest: 'uploads/'})

router.get('/', getBooks);
router.get('/stats', getBooksStats);
router.get('/:id', getBookById);
router.post('/', upload.single('image'), createBookValidationRules(), validate, createBook);
router.delete('/:id', deleteBook);
router.put('/:id', upload.single('image'), updateBookValidationRules(), validate, updateBook);

module.exports = router;