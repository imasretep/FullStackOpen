import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(content, 5))
    }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm