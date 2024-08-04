import axios from 'axios'
const baseUrl = '/api/persons'
// const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(res => res.data)
}

const deletePerson = person => {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(res => res.data)
}

const update = person => {
    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(res => res.data)
}

export default {
    getAll: getAll,
    create: create,
    delete: deletePerson,
    update: update
}