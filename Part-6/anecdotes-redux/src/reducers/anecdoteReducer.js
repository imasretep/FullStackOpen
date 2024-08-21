import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    addAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const updateAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(content)
    dispatch(voteAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer