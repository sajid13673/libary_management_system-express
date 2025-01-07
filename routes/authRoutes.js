const express = require('express');
const router = express.Router();
const {login, profile} = require('../controllers/authController');	
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login)
router.get('/profile', authMiddleware, profile)

module.exports = router;
