require('dotenv').config()

const jwt = require('jsonwebtoken')

const { CustomError } = require('./errorhandler.middleware')

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) throw new CustomError('unauthorized', 401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    throw new CustomError('Invalid token', 401)
  }
}

module.exports = authMiddleware
