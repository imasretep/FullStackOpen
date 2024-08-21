const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const users = await User.find({})
    const userExists = users.some(user => user.username === request.body.username)
    if(userExists){
        return response.status(409).json({ error: 'username must be unique'})
    }

    if(request.body.password.length < 3){
        return response.status(403).json({ error: 'password too short'})
    }

    const salt = 10
    const passwordHash = await bcrypt.hash(request.body.password, salt)

    const user = new User({
        username: request.body.username,
        passwordHash: passwordHash,
        name: request.body.name
    })

    const newUser = await user.save()
    response.status(201).json(newUser)
})

module.exports = usersRouter