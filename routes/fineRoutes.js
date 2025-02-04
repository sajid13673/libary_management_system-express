const express = require('express');
const router = express.Router();
const {getFines} = require('../controllers/fineController')

router.get('/', getFines);

module.exports = router;