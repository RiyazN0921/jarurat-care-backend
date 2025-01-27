const express = require('express')

const resourceController = require('../controller/resource.controller')

const authMiddleware = require('../middleware/auth.middleware')

const roleMiddleware = require('../middleware/role.middleware')

const validate = require('../validation/validation')

const {
  resourceValidation,
  getResourceByIdValidator,
  updateResourceValidator,
} = require('../validation/resource.validation')

const resourceRouter = express.Router()

resourceRouter.post(
  '/create',
  authMiddleware,
  roleMiddleware(['Admin']),
  validate(resourceValidation),
  resourceController.create,
)

resourceRouter.get(
  '/all-resource',
  authMiddleware,
  roleMiddleware(['Admin', 'User']),
  resourceController.getAllResources,
)

resourceRouter.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['Admin', 'User']),
  validate(getResourceByIdValidator, 'params'),
  resourceController.getResourceById,
)

resourceRouter.put(
  '/update/:id',
  authMiddleware,
  roleMiddleware(['Admin']),
  validate(updateResourceValidator),
  resourceController.update,
)

resourceRouter.delete(
  '/delete/:id',
  authMiddleware,
  roleMiddleware(['Admin']),
  resourceController.delete,
)

module.exports = resourceRouter
