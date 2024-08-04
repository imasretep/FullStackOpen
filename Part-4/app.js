require('express-async-errors')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const { morganCustomised, tokenExtractor, unknownEndpoint } = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((error) => {
    error('error:', error.message)
  })

app.use(cors())
app.use(morganCustomised)

app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/e2eTesting')
  app.use('/api/testing', testingRouter)
}

app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)

module.exports = app