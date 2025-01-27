const express = require('express')

const userRouter = require('./user.routes')

const resourceRouter = require('./resource.routes')

const mainRouter = express.Router()

mainRouter.get('/status', (req, res) => {
  res.json({ message: 'Server is live' })
})

mainRouter.use('/auth', userRouter)

mainRouter.use('/resource', resourceRouter)

module.exports = mainRouter
