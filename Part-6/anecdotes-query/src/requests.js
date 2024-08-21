import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const postAnecdote = content => 
    axios.post(baseUrl, content).then(res => res.data)

export const putAnecdote = content => 
    axios.put(`${baseUrl}/${content.id}`, content).then(res => res.data)