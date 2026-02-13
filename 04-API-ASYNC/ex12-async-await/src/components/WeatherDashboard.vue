<template>
  <div class="weather-dashboard">
    <h1>Weather Dashboard</h1>

    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search city..."
        class="search-input"
      >
      <p class="hint">Try: London, Paris, Tokyo</p>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading weather data...</p>
      <p v-if="retryCount > 0" class="retry-info">
        Retry attempt {{ retryCount }}/{{ maxRetries }}
      </p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchWeather" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="weatherData" class="weather-info">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div class="weather-main">
        <img
          :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
          :alt="weatherData.weather[0].description"
        >
        <div>
          <p class="temperature">{{ Math.round(weatherData.main.temp) }}°C</p>
          <p class="description">{{ weatherData.weather[0].description }}</p>
        </div>
      </div>
      <div class="weather-details">
        <div class="detail">
          <span class="label">Feels like:</span>
          <span>{{ Math.round(weatherData.main.feels_like) }}°C</span>
        </div>
        <div class="detail">
          <span class="label">Humidity:</span>
          <span>{{ weatherData.main.humidity }}%</span>
        </div>
        <div class="detail">
          <span class="label">Wind:</span>
          <span>{{ weatherData.wind.speed }} m/s</span>
        </div>
      </div>
    </div>

    <div class="multiple-cities">
      <h2>Compare Cities</h2>
      <button @click="fetchMultipleCities" :disabled="isLoadingMultiple">
        {{ isLoadingMultiple ? 'Loading...' : 'Load Multiple Cities' }}
      </button>

      <div v-if="multipleCitiesData.length" class="cities-grid">
        <div
          v-for="city in multipleCitiesData"
          :key="city.id"
          class="city-card"
        >
          <h3>{{ city.name }}</h3>
          <p class="temp">{{ Math.round(city.main.temp) }}°C</p>
          <p>{{ city.weather[0].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDebounce } from '../composables/useDebounce'
import { weatherService } from '../services/weatherService'

const searchQuery = ref('London')
const debouncedSearch = useDebounce(searchQuery, 800)

const weatherData = ref(null)
const error = ref(null)
const isLoading = ref(false)
const retryCount = ref(0)
const maxRetries = 3

const multipleCitiesData = ref([])
const isLoadingMultiple = ref(false)

watch(debouncedSearch, async (newCity) => {
  if (newCity) {
    await fetchWeather()
  }
})

async function fetchWeather() {
  isLoading.value = true
  error.value = null
  retryCount.value = 0

  try {
    weatherData.value = await fetchWithRetry(
      () => weatherService.getCurrentWeather(debouncedSearch.value)
    )
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

async function fetchWithRetry(asyncFn, attempt = 0) {
  try {
    return await asyncFn()
  } catch (e) {
    if (attempt < maxRetries) {
      retryCount.value = attempt + 1
      const delay = 1000 * Math.pow(2, attempt)
      await new Promise(resolve => setTimeout(resolve, delay))
      return fetchWithRetry(asyncFn, attempt + 1)
    }
    throw e
  }
}

async function fetchMultipleCities() {
  isLoadingMultiple.value = true

  try {
    const cities = ['London', 'Paris', 'Tokyo', 'New York']
    multipleCitiesData.value = await weatherService.getMultipleCities(cities)
  } catch (e) {
    console.error('Failed to fetch multiple cities:', e)
  } finally {
    isLoadingMultiple.value = false
  }
}

fetchWeather()
</script>

<style scoped>
.weather-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}

.search-section {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.hint {
  margin-top: 6px;
  font-size: 0.9rem;
  color: #6b7280;
}

.loading {
  text-align: center;
  padding: 50px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-info {
  margin-top: 8px;
  color: #facc15;
}

.error {
  text-align: center;
  padding: 30px;
  background: #fef2f2;
  border-radius: 12px;
  color: #b91c1c;
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.weather-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin-bottom: 30px;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  margin: 0;
}

.description {
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.detail {
  background: rgba(255,255,255,0.15);
  padding: 10px 14px;
  border-radius: 10px;
}

.label {
  display: block;
  font-size: 0.85rem;
  opacity: 0.9;
}

.multiple-cities {
  margin-top: 30px;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.city-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.city-card .temp {
  font-size: 32px;
  font-weight: bold;
  color: #42b883;
  margin: 10px 0;
}
</style>