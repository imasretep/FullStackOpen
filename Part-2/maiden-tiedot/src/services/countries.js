import axios from 'axios'
const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const req = axios.get(url)
  return req.then(res => res.data)
}


export default {
    getAll: getAll,
}