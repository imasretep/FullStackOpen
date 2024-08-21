import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification: (state, action) => {
      return action.payload
    },
    resetNotification: (state, action) => {
      return null
    }
  }
})

export const { addNotification, resetNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  const timeTillClear = time * 1000
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, timeTillClear)
  }
}


export default notificationSlice.reducer