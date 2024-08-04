import axios from "axios"
const api_key = import.meta.env.VITE_SOME_KEY
const url = 'https://api.openweathermap.org/data/2.5/weather?q='

const getCurrent = (capital) => {
  const urlAdress = `${url}${capital}&appid=${api_key}` 
  const req = axios.get(urlAdress)
  return req.then(res => res.data)
}

export default {
    get: getCurrent
}