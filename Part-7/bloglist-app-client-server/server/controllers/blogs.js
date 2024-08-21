const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")
const { userExtractor } = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { comment: 1 })
  response.json(blogs)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = await request.user

  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user,
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = await request.user
  const blog = await Blog.findById(request.params.id)
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: "Unauthorized" })
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    title: request.body.title,
    Author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(200).json(updatedBlog)
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = new Comment({
    comment: request.body.comment,
  })
  const newComment = await comment.save()

  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  blog.comments = blog.comments.concat(newComment._id)
  await blog.save()

  response.status(200).json(newComment)
})

module.exports = blogsRouter
