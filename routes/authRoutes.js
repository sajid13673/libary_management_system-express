const express = require('express');
const router = express.Router();
const {login, profile, logout, refreshToken, changePassword, register} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const {changePasswordValidationRules, validate, registerValidationRules} = require('../middlewares/validationMiddlewares');

router.post('/login', login)
router.post('/register', registerValidationRules(), validate, register)
router.post('/refresh-token', refreshToken)
router.post('/logout', logout)
router.use(authMiddleware)
router.get('/profile', profile)
router.post('/change-password', changePasswordValidationRules(), validate, changePassword)
module.exports = router;