const Joi = require('joi')

exports.resourceValidation = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().required(),
})

exports.getResourceByIdValidator = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.length': 'Invalid ID format',
    'any.required': 'User ID is required',
  }),
})

exports.updateResourceValidator = Joi.object({
  title: Joi.string().max(255).optional().messages({
    'string.title': 'title should be less than 255 characters',
  }),
  description: Joi.string().optional().messages({
    'string.description': 'description must be a string',
  }),
})
