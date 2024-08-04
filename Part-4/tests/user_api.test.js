const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)


const users = [
    {
        "username": "user1",
        "password": "user1password",
        "name": "First User",
    },
]

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        let user = new User(users[0])
        await user.save()
    })

    test('POST: User can be created', async () => {
        const user = {
            username: 'Tester',
            password: 'yksikaksikolme',
            name: 'John Doe'
        }

        await api.post('/api/users').send(user).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, 2)
    })

    test('POST: Username must be unique', async () => {
        const user = {
            username: 'user1',
            password: 'yksikaksikolme',
            name: 'John Doe'
        }
        const result = await api.post('/api/users').send(user).expect(409).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('username must be unique'))
    })

    test('POST: Password must be atleast 3 characters long', async () => {
        const user = {
            username: 'Tester',
            password: 'yk',
            name: 'John Doe'
        }
        const result = await api.post('/api/users').send(user).expect(403).expect('Content-Type', /application\/json/)
        assert(result.body.error.includes('password too short'))
    })



})


after(async () => {
    await mongoose.connection.close()
})