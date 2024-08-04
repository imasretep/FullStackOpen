import Weather from "./Weather"
import Button from "./Button"

const Countries = ({ countries, handleClick, weather }) => {
    if (countries.length > 10) {
      return (
        <div>Too many matches, specify another filter!</div>
      )
    }
    if (countries.length === 1) {
      return (
        <div>
          <CountryWithInfo country={countries} />
          <Weather country={countries} weather={weather} />
        </div>
      )
    }
    return (
      <div>
        {countries.map(c => <Country key={c.name.common} country={c} handleClick={handleClick} />)}
      </div>
    )
  }
  
  const Country = ({ country, handleClick }) => {
      return (
        <div>
          {country.name.common}  <Button handleClick={() => handleClick(country.name.common)} />
        </div>
      )
  }
  
  const CountryWithInfo = ({country}) =>{
    const languages = Object.entries(country[0].languages)
    return(
      <div>
        <h1>{country[0].name.common}</h1>
        capital {country[0].capital} <br/>
        area {country[0].area}
        <h2>languages:</h2>
        <ul>
          {languages.map(([code, language]) => <li key={code}>{language}</li>)}
        </ul>
        <img src={country[0].flags.png} />
      </div>
    )
  }


  export default Countries