import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
