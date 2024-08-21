import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      if(state.filter === 'NONE'){
        return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
      }
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
    })
    
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(setNotification('You voted, ' + anecdote.content, 5))
      dispatch(updateAnecdote(anecdote))

    }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                  </div>
                </div>
              )}
        </div>
    )
}

export default AnecdoteList