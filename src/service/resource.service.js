const resourceModel = require('../model/resource.model')

const { CustomError } = require('../middleware/errorhandler.middleware')

exports.createResource = async (id, title, description) => {
  const resource = await resourceModel.create({
    createdBy: id,
    title,
    description,
  })

  if (!resource) {
    throw new CustomError('something went wrong!', 400)
  }

  return resource
}

exports.fetchAllResources = async () => {
  const resource = await resourceModel.find()

  return resource
}

exports.fetchResourceById = async (id) => {
  const resource = await resourceModel.findById(id)

  if (!resource) {
    throw new CustomError('resource not found', 404)
  }

  return resource
}

exports.updateResource = async (id, title, description) => {
  const resource = await resourceModel.findByIdAndUpdate(
    id,
    { title, description },
    { new: true },
  )

  if (!resource) {
    throw new CustomError('resource not found', 404)
  }

  return resource
}

exports.deleteResource = async (id) => {
  const resource = await resourceModel.findByIdAndDelete(id)

  if (!resource) {
    throw new CustomError('resource not found', 404)
  }

  return resource
}
