const BASE_URL = 'https://jsonplaceholder.typicode.com'

class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new APIError(
      error.message || `HTTP Error: ${response.status}`,
      response.status
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`)
    return handleResponse(response)
  },

  async post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async put(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return handleResponse(response)
  },

  async delete(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    return handleResponse(response)
  }
}