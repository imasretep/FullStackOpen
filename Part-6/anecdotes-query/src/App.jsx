import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, putAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: putAnecdote,
    onSuccess: () => 
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }
  if(result.isError){
    return <div>{result.error.message}: anecdote service is not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: 'SHOW', payload: 'You voted ' + anecdote.content })
    setTimeout(() => {dispatch({ type: 'HIDE' })}, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
