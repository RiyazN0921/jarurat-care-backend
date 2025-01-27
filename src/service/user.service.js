const { CustomError } = require('../middleware/errorhandler.middleware')

const userModel = require('../model/user.model')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

exports.signupUser = async (email, password, role) => {
  const user = await userModel.findOne({ email: email })

  if (user) {
    throw new CustomError('user with same email already exists', 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const createUser = await userModel.create({
    email: email,
    password: hashedPassword,
    role: role,
  })

  return createUser
}

exports.loginUser = async (email, password) => {
  const user = await userModel.findOne({ email: email })

  if (!user) {
    throw new CustomError('user does not exists', 404)
  }

  const comparepass = await bcrypt.compare(password, user.password)

  if (!comparepass) {
    throw new CustomError('invalid credentials!', 400)
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1y' },
  )

  return { user, token }
}

exports.getAllUsers = async () => {
  const user = await userModel.find()

  return user
}

exports.getUserById = async (id) => {
  const user = await userModel.findById(id)

  if (!user) {
    throw new CustomError('user not found', 404)
  }

  return user
}

exports.updateUser = async (id, username, email) => {
  const user = await userModel.findByIdAndUpdate(
    id,
    { username: username, email: email },
    {
      new: true,
    },
  )

  if (!user) {
    throw new CustomError('user does not exists', 404)
  }

  return user
}

exports.deleteUser = async (id) => {
  const user = await userModel.findByIdAndDelete(id)

  if (!user) {
    throw new CustomError('user does not exists', 404)
  }

  return user
}
