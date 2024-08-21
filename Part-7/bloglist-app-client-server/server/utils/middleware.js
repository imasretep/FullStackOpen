const { info, error } = require('./logger')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

morgan.token('info', (req) => {
    return JSON.stringify(req.body)
  })
const morganCustomised = morgan(':method :url :status :res[content-length] - :response-time ms :info')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization === undefined){
    return response.status(401).json({ error: 'Unauthorized' })
  }
  if(authorization !== "" && authorization.startsWith('Bearer ')){
    const token =  authorization.replace('Bearer ', '')
    request.token = token
  }
  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = User.findById(decodedToken.id)
  request.user = user
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    morganCustomised,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}