import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateLike = async (blog) => {
  const blogId = blog.id

  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, likedBlog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const blogId = blog.id
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const addComment = async (content) => {
  const config = {
    headers: { Authorization: token },
  }
  const comment = { comment: content.comment }
  const response = await axios.post(
    `${baseUrl}/${content.id}/comments`,
    comment,
    config
  )
  return response.data
}

export default { getAll, create, setToken, updateLike, deleteBlog, addComment }
