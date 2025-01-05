const { body, validationResult } = require('express-validator');
const {User, Member} = require('../models');

const loginValidationRules = () => {  
  return [
    body('email').isEmail().withMessage('Email is invalid')
    .notEmpty().withMessage('Email is Required'),
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
    body('title').notEmpty().withMessage('Title is required')
    .isLength({max:50}).withMessage('Title can not exceed 50 characters'),
    body('author').notEmpty().withMessage('Author is required')
    .isLength({max:50}).withMessage('Author can not exceed 50 characters'),
    body('year').notEmpty().withMessage('Year is required')
    .isNumeric().withMessage('Year must be numeric')
    .isLength({min: 4, max: 4}).withMessage('Enter a valid year'),
    body('publisher').isLength({max:50}).withMessage('Publisher can not exceed 50 characters')
  ];
};
const memberValidationRules = () => {
  return [
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('name').notEmpty().withMessage('Name is required')
    .isLength({max:50}).withMessage('Name can not exceed 50 characters'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phoneNumber').notEmpty().withMessage('Phone Number is required')
    .isNumeric().withMessage('Phone number must be numeric')
    .isLength({min: 10, max: 13}).withMessage('Please enter a valid phone number'),
    body('email').custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error('Email already exists');
      }
    }),
    body('phoneNumber').custom(async (PhoneNumber) => {
      const member = await Member.findOne({ where: { PhoneNumber } });
      if (member) {
        throw new Error('Email already exists');
      }
    })
  ];
};

module.exports = {
  loginValidationRules,
  bookValidationRules,
  memberValidationRules,
  validate,
};
