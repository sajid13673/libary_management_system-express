const express = require('express');
const router = express.Router();
const {getBooks, createBook} = require('../controllers/bookController');
const {bookValidationRules, validate} = require('../middlewares/validationMiddlewares')
const multer = require('multer');

const upload = multer({dest: 'uploads/'})

router.get('/', getBooks);
router.post('/', upload.single('image'), bookValidationRules(), validate, createBook);
module.exports = router;