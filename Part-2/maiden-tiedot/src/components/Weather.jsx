const Weather = ({country, weather }) => {
    if (!weather.name) {
      return <div>Getting weather data...</div>   
    }
    return(
      <div>
        <h1>Weather in {country[0].capital}</h1>
        Temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius
        <br />
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <br />
        Wind {weather.wind.speed} m/s
      </div>
    )
  }

  export default Weather