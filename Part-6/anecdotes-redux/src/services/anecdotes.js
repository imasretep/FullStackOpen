import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const anecdote = {content: content, votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const update = async (content) => {
    const url = `${baseUrl}/${content.id}`
    const anecdote = {...content, votes: content.votes + 1}
    const response = await axios.put(url, anecdote)
    return response.data
}

export default {getAll, create, update}