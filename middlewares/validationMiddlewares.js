const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {  
  return [
    body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  loginValidationRules,
  validate
};
