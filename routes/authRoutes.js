const express = require('express');
const router = express.Router();
const {login, profile, logout, refreshToken} = require('../controllers/authController');	
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login)
router.get('/profile', authMiddleware, profile)
router.post('/refresh-token', refreshToken)
router.get('/logout', logout)

module.exports = router;