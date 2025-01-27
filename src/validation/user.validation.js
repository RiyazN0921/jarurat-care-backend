const Joi = require('joi')

exports.signupValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  role: Joi.string().valid('User', 'Admin').required().messages({
    'any.only': 'Role must be either user or admin',
    'any.required': 'Role is required',
  }),
})

exports.loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
})

exports.getUserByIdValidator = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.length': 'Invalid ID format',
    'any.required': 'User ID is required',
  }),
})

exports.updateUserValidator = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email': 'Invalid email format',
  }),
  username: Joi.string().optional().messages({
    'string.base': 'Username must be a string',
  }),
})
