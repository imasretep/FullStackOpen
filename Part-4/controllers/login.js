const jwt = require('jsonwebtoken')
const User = require ('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    const user = await User.findOne({username: request.body.username}) 

    let passwordCorrect = false
    if(user !== null){
       passwordCorrect = await bcrypt.compare(request.body.password, user.passwordHash)
    }

    if(!(passwordCorrect && user)){
        return response.status(401).json({ error: 'invalid username or password'})
    }

    const userForToken  = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send( {token, username: user.username, name: user.name})

})

module.exports = loginRouter