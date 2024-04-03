import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const Filter = ({ inputValue, onChange }) => {
  return (
    <div>
      find countries <input value={inputValue} 

      onChange={onChange}
      />
    </div>
  )
}

const NarrowResults = ({ countries, showOption }) => {
  return (
    <pre>
      {countries.map(country => <li key={country.name.common}>{country.name.common}<button onClick={() => showOption(country.name.common)}>show</button></li>)}
    </pre>
  )
}

const SingleResult = ({ countries, weather }) => {
  if (!weather) {
    return (
      <>
      </>
    )
  } else {
    const country = countries[0];
    const header = country.name.common;
    const capital = country.capital;
    const area = country.area;
    const languages = Object.values(country.languages);
    const flag = country.flags.png;
    const temperature = (weather.current.temp - 273.15).toFixed(2)
    const weatherDescription = weather.current.weather[0].description;
    const weatherImgSrc = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    const wind = weather.current['wind_speed']
    
    return (
      <div>
        <h1>{header}</h1>
        
        <p>
          capital {capital} <br/>
          area {area}
        </p>

        <p>
          <strong>languages:</strong>
        </p>

        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={flag} alt='flag'/>
        
        <h2>Weather in {capital}</h2>
        <p>temperature {temperature} Celcius</p>
        <img src={weatherImgSrc} alt={weatherDescription}/>
        <p>wind {wind} m/s</p>
        
      </div>
    )
  }
}

const DisplayResults = ({ countries, showOption, weather }) => {
  let message;

  if (countries === null) {
    message = ''
  } else if (countries.length === 0) {
    message = 'not found...'
  } else if (countries.length > 10) {
    message = 'Too many matches, specify another filter'
  } else if (countries.length === 1) {
    return (
      <SingleResult countries={countries} weather={weather} />
    )
  } else {
    return (
      <NarrowResults countries={countries} showOption={showOption} />
    )
  }

  return (
    <pre>
      {message}
    </pre>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (searchName) {
      countriesService
        .getFiltered(searchName)
        .then(response => {
          if (response.length === 1) {
            countriesService
              .getWeather(response[0])
              .then(setWeather)
              .then(() => setCountries(response))
          } else {
            setCountries(response)
          }
        })
    } else {
      setCountries([])
    }
  }, [searchName])

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const showOption = (countryName) => {
    setSearchName(countryName);
  }

  return (
    <div>
      <Filter inputValue={searchName} onChange={handleSearch} />

      <DisplayResults countries={countries} showOption={showOption} weather={weather} />
    </div>
    
  )
}

export default App