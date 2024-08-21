const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        "title": "First Blog",
        "url": "FistBlog.com",
        "likes": 20,
        "id": "669020575ba38cc5ea2326e7"
    },
    {
        "title": "Second Blog",
        "url": "SecondBlog.com",
        "likes": 10,
        "id": "6690218566883b8d6f83336d"
    },
    {
        "title": "Third Blog",
        "url": "ThirdBlog.com",
        "likes": 10,
        "id": "66910ceb288219f616e80e51"
    },
    {
        "title": "Fourth Blog",
        "url": "FourthBlog.com",
        "likes": 10,
        "id": "66911206fb34057efe67c9eb"
    }
]


test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('Total Likes', () => {
  test('Likes are calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 50)
  })

  test('Empty list returns 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })
  test('When only one blog, likes returned are equal to that', () => {
    const blog = [
        {
            "title": "First Blog",
            "url": "FistBlog.com",
            "likes": 10,
            "id": "669020575ba38cc5ea2326e7"
        },
    ]
    const result = listHelper.totalLikes(blog)
    assert.strictEqual(result, 10)
  })

})

describe('Most Likes', () => {
  test('Blog with the most likes is returned', () => {

    const blog = {
        "title": "First Blog",
        "url": "FistBlog.com",
        "likes": 20,
        "id": "669020575ba38cc5ea2326e7"
    }
    
    const result = listHelper.blogWithMostLikes(blogs)
    assert.deepStrictEqual(result, blog)
    })
})