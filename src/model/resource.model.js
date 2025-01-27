const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
)

const resourceModel = mongoose.model('resource', resourceSchema)

module.exports = resourceModel
