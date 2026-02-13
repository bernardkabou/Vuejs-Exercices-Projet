const API_KEY = '90da7a8cefec98362a9fe1d4de8a1605'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const weatherService = {
  async getCurrentWeather(city) {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`Weather data not found for ${city}`)
    }

    return response.json()
  },

  async getMultipleCities(cities) {
    const promises = cities.map(city => this.getCurrentWeather(city))
    return Promise.all(promises)
  },

  async getForecast(city) {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error(`Forecast not found for ${city}`)
    }

    return response.json()
  }
}