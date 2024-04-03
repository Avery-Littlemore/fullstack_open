import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
import weatherAPI from './weatherAPI'

const getFiltered = (searchName) => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request
    .then(response => {
      return response.data.filter(country => {
        return country.name.common.toLowerCase().includes(searchName.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchName.toLowerCase())
      })
    })
}

const getWeather = (country) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${weatherAPI}`)
  return request
    .then(response => response.data)
    .then(response => {
      const weather = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${response[0].lat}&lon=${response[0].lon}&appid=${weatherAPI}`)
      return weather
        .then(response => response.data)
    })
}


export default { getFiltered, getWeather }