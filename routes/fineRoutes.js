const express = require('express');
const router = express.Router();
const {getFines, getFineById} = require('../controllers/fineController')

router.get('/', getFines);
router.get('/:id', getFineById);
module.exports = router;