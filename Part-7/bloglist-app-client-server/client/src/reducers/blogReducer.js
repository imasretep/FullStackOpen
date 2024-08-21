import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    updateLike(state, action) {
      return state
        .map((blog) =>
          blog.id === action.payload.id
            ? { ...blog, likes: action.payload.likes }
            : blog
        )
        .sort((a, b) => b.likes - a.likes)
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      return state.map((blog) =>
        blog.id === id
          ? { ...blog, comments: [...blog.comments, { comment }] }
          : blog
      )
    },
  },
})

export const { setBlogs, addBlog, deleteBlog, updateLike, addComment } =
  blogSlice.actions

export const getAllBlogs = (token) => {
  return async (dispatch) => {
    blogService.setToken(token)
    const blogs = await blogService.getAll()
    const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedByLikes))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(addBlog(blog))
  }
}

export const removeBlog = (content) => {
  return async (dispatch) => {
    await blogService.deleteBlog(content)
    dispatch(deleteBlog(content))
  }
}

export const updateBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.updateLike(content)
    dispatch(updateLike(blog))
  }
}

export const addCommentToBlog = (content) => {
  return async (dispatch) => {
    const data = await blogService.addComment(content)
    const blogId = content.id
    const comment = {
      comment: data.comment,
      id: blogId,
    }
    dispatch(addComment(comment))
  }
}

export default blogSlice.reducer
