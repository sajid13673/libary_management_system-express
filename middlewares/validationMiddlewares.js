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
const bookValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required').isLength({max:50}).withMessage('Title can not exceed 50 characters'),
    body('author').notEmpty().withMessage('Author is required').isLength({max:50}).withMessage('Author can not exceed 50 characters'),
    body('year').notEmpty().withMessage('Year is required').isNumeric().withMessage('Year must be numeric').isLength({min: 4, max: 4}).withMessage('Enter a valid year'),
    body('publisher').isLength({max:50}).withMessage('Publisher can not exceed 50 characters')
  ];
};

module.exports = {
  loginValidationRules,
  bookValidationRules,
  validate,
};
