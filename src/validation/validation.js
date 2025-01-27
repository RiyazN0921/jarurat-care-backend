const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[property]
    const { error } = schema.validate(dataToValidate, { abortEarly: false })

    if (error) {
      const messages = error.details.map((detail) => detail.message)
      return res
        .status(400)
        .json({ message: 'Validation error', errors: messages })
    }

    next()
  }
}

module.exports = validate
