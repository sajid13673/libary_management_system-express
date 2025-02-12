const express = require('express');
const router = express.Router();
const {login, profile, logout, refreshToken, changePassword} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login)
router.get('/profile', authMiddleware, profile)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)
router.post('/change-password', authMiddleware, changePassword)
module.exports = router;