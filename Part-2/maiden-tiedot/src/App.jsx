import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Countries from './components/Countries'
import SearchField from './components/SearchField'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState('')

  useEffect(() =>{
    countryService.getAll()
    .then(list => {
      setCountries(list)
    })
  }, [])

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }
  
  const handleClick = (event) => {
    setFilter(event)
  }

  const getCountries = () => {
    if (filter.length > 0) {
      return countries.filter(c => c.name.common
        .toLowerCase()
        .includes(filter.toLowerCase()))
    } 
    return countries
  }

  const countryList = getCountries()

  useEffect(() => {
    if (countryList.length === 1) {
      if (capital !== countryList[0].capital) { 
        setCapital(countryList[0].capital)
      }
      if (capital) {
        weatherService.get(capital)
        .then(currentWeather => {
          setWeather(currentWeather)
        })
      }
    } else {
        if (capital !== '') {
          setCapital('')
        }
    }
  }, [countryList, weather, capital])



  return (
    <div>
      <SearchField handleInputChange={handleInputChange}/>
      <Countries 
      countries={countryList} 
      handleClick={handleClick}
      weather={weather}/> 
    </div>
  )
}

export default App
