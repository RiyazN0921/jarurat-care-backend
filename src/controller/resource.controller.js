const {
  createResource,
  fetchAllResources,
  fetchResourceById,
  updateResource,
  deleteResource,
} = require('../service/resource.service')

exports.create = async (req, res, next) => {
  try {
    const user = req.user._id

    const { title, description } = req.body

    const resource = await createResource(user, title, description)

    res
      .status(200)
      .json({ message: 'resource created successful', data: resource })
  } catch (error) {
    next(error)
  }
}

exports.getAllResources = async (req, res, next) => {
  try {
    const resource = await fetchAllResources()

    res
      .status(200)
      .json({ message: 'resources fetched successfully', data: resource })
  } catch (error) {
    next(error)
  }
}

exports.getResourceById = async (req, res, next) => {
  try {
    const resource = await fetchResourceById(req.params.id)

    res
      .status(200)
      .json({ message: 'Resource fetched successful', data: resource })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description } = req.body
    const resource = await updateResource(id, title, description)

    res.status(200).json({ message: 'update successful', data: resource })
  } catch (error) {
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params

    await deleteResource(id)

    res.status(200).json({ message: 'resouce deleted successfully' })
  } catch (error) {
    next(error)
  }
}
