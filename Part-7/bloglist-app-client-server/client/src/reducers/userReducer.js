import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    nullUser(state, action) {
      state = null
      return state
    },
  },
})

export const { setUser, nullUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (error) {
      throw new Error('Invalid username or password')
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(nullUser())
  }
}

export const storageUser = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
  }
}
export default userSlice.reducer
