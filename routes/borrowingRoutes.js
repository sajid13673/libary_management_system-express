const express = require('express');
const { getBorrowings, createBorrowing, getBorrowingById, deleteBorrowing, updateBorrowing } = require('../controllers/borrowingController');
const { createBorrowingValidationRules, validate, updateBorrowingValidationRules } = require('../middlewares/validationMiddlewares');
const router = express.Router();

router.get('/', getBorrowings );
router.post('/',createBorrowingValidationRules(), validate, createBorrowing);
router.get('/:id', getBorrowingById);
router.delete('/:id', deleteBorrowing);
router.put('/:id', updateBorrowingValidationRules(), validate, updateBorrowing);

module.exports = router;