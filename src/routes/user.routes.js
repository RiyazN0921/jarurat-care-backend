const express = require('express')

const userController = require('../controller/user.controller')

const authMiddleware = require('../middleware/auth.middleware')

const validate = require('../validation/validation')

const {
  signupValidator,
  loginValidator,
  getUserByIdValidator,
  updateUserValidator,
} = require('../validation/user.validation')

const userRouter = express.Router()

userRouter.post('/signup', validate(signupValidator), userController.signup)

userRouter.post('/login', validate(loginValidator), userController.login)

userRouter.get('/all-users', userController.fetchAllusers)

userRouter.get(
  '/:id',
  validate(getUserByIdValidator, 'params'),
  userController.fetchUserById,
)

userRouter.put(
  '/update',
  validate(updateUserValidator),
  authMiddleware,
  userController.update,
)

userRouter.delete('/delete', authMiddleware, userController.delete)

module.exports = userRouter
