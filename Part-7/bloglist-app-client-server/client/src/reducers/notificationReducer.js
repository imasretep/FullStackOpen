import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, color: 'green' },
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.color = action.payload.color
      return state
    },
    resetNotification: (state) => {
      state.message = null
      state.color = 'green'
    },
  },
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const showNotification = (message, color, time) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, color }))

    setTimeout(() => {
      dispatch(resetNotification())
    }, time)
  }
}

export default notificationSlice.reducer
