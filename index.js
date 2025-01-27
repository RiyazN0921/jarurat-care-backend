const express = require('express')

require('dotenv').config()

const bodyParser = require('body-parser')

const cors = require('cors')

const { dbConnection } = require('./src/config/database.config')

const { errorHandler } = require('./src/middleware/errorhandler.middleware')

const mainRouter = require('./src/routes/index.routes')

const app = express()

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'welcome to jarurat-care backend!' })
})

app.use('/api', mainRouter)

app.use(errorHandler)

app.listen(process.env.PORT || 5000, async () => {
  await dbConnection()
  console.log('Server Listening on port ' + process.env.PORT || 5000)
})
