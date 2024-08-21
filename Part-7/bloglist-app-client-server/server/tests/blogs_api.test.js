const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const blogs = [
    {
        "title": "First Blog",
        "url": "FistBlog.com",
        "likes": 20,
    },
    {
        "title": "Second Blog",
        "url": "SecondBlog.com",
        "likes": 10,
    },
    {
        "title": "Third Blog",
        "url": "ThirdBlog.com",
        "likes": 10,
    },
    {
        "title": "Fourth Blog",
        "url": "FourthBlog.com",
        "likes": 10,
    }
]


describe('Blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        let blog = new Blog()
        for (let i = 0; i < blogs.length; i++) {
            blog = new Blog(blogs[i])
            await blog.save()
        }
    })

    test('GET: Corret amount of JSON formated blogs are returned', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        console.log(response.body.length)
        assert.strictEqual(response.body.length, blogs.length)
    })

    test('GET: Id field is called "id"', async () => {
        const response = await api.get('/api/blogs')
        let isTrue = false
        if('id' in response.body[0]){
            isTrue = true
        }

        assert.strictEqual(isTrue, true)
    })

    test('POST: Blog can be added', async () => {
        const blog =     {
            title: "Fifth Blog",
            url: "FifthBlog.com",
            likes: 10,
        }

        await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, blogs.length + 1)
        assert.strictEqual(response.body[4].title, blog.title)
    })

    test('POST: If blog has no likes, likes is 0', async () => {
        const blog =     {
            title: "Fifth Blog",
            url: "FifthBlog.com",
        }
        await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[4].likes, 0)
    })

    test('POST: If blog has no title status code 400 is received', async () => {
        const blog = {
            url: 'Blogs.com',
            likes: 10
        }
        await api.post('/api/blogs').send(blog).expect(400)
    })

    test('POST: If blog has no url status code 400 is received', async () => {
        const blog = {
            title: 'Fifth Blog',
            likes: 10
        }
        await api.post('/api/blogs').send(blog).expect(400)
    })

    test('DELETE: Blog can be deleted', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[3].id
        await api.delete(`/api/blogs/${id}`).expect(204)

        const listAfterDelete = await api.get('/api/blogs')
        assert.strictEqual(listAfterDelete.body.length, blogs.length - 1)
    })

    test('PUT: Blog can be updated', async () => {
        const response = await api.get('/api/blogs')
        const id = response.body[3].id

        const blog = {
            title: "Fourth Blog",
            url: "FourthBlog.com",
            likes: 20,
        }

        await api.put(`/api/blogs/${id}`).send(blog).expect(200)

        const listAfterUpdate = await api.get('/api/blogs')
        assert.strictEqual(listAfterUpdate.body[3].likes, blog.likes)
    })
})


after(async () => {
  await mongoose.connection.close()
})