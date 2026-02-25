const BASE_URL = 'https://fakestoreapi.com'

export const apiService = {
    async get(endpoint) {
        const response = await fetch(`${BASE_URL}${endpoint}`)
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
    },

    async post(endpoint, data) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (!response.ok) throw new Error('Network response was not ok')
        return response.json()
    },

    // Mock specific endpoints or use fakestoreapi
    products: {
        getAll: () => apiService.get('/products'),
        getOne: (id) => apiService.get(`/products/${id}`),
        getCategories: () => apiService.get('/products/categories'),
    },

    users: {
        getAll: () => apiService.get('/users'),
        getOne: (id) => apiService.get(`/users/${id}`),
    }
}
