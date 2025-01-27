const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    role: { type: String, enum: ['Admin', 'User'] },
  },
  { timestamps: true },
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
