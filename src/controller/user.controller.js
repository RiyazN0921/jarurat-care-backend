const {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../service/user.service')

exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    const user = await signupUser(email, password, role)

    res.status(201).json({ message: 'user signup successful', data: user })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await loginUser(email, password)

    res.status(200).json({ message: 'login successful', data: user })
  } catch (error) {
    next(error)
  }
}

exports.fetchAllusers = async (req, res, next) => {
  try {
    const user = await getAllUsers()

    res.status(200).json({ message: 'users fetched successfully', data: user })
  } catch (error) {
    next(error)
  }
}

exports.fetchUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await getUserById(id)

    res.status(200).json({ message: 'user fetched successfully', data: user })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const user = req.user._id

    const { email, username } = req.body

    const updateuser = await updateUser(user, username, email)

    res
      .status(200)
      .json({ message: 'user updated successfully', data: updateuser })
  } catch (error) {
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const user = req.user._id

    await deleteUser(user)

    res.status(200).json({ message: 'user deleted successfully' })
  } catch (error) {
    next(error)
  }
}
