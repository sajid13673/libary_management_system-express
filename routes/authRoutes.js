const express = require('express');
const router = express.Router();
const {login, profile, logout} = require('../controllers/authController');	
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login)
router.get('/profile', authMiddleware, profile)
router.get('/logout', logout)

module.exports = router;