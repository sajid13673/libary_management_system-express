const express = require('express');
const { getBorrowings, createBorrowing, getBorrowingById, deleteBorrowing } = require('../controllers/borrowingController');
const { borrowingValidation, validate } = require('../middlewares/validationMiddlewares');
const router = express.Router();

router.get('/', getBorrowings );
router.post('/',borrowingValidation(), validate, createBorrowing);
router.get('/:id', getBorrowingById);
router.delete('/:id', deleteBorrowing);

module.exports = router;