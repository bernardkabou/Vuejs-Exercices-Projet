import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([
    {
      id: 1,
      name: 'Laptop',
      price: 999,
      category: 'Electronics',
      image: 'https://picsum.photos/200/200?random=1',
      description: 'High-performance laptop',
      stock: 10
    },
    {
      id: 2,
      name: 'Headphones',
      price: 199,
      category: 'Electronics',
      image: 'https://picsum.photos/200/200?random=2',
      description: 'Noise-cancelling headphones',
      stock: 25
    },
    {
      id: 3,
      name: 'Coffee Maker',
      price: 79,
      category: 'Home',
      image: 'https://picsum.photos/200/200?random=3',
      description: 'Automatic coffee maker',
      stock: 15
    },
    {
      id: 4,
      name: 'Desk Chair',
      price: 299,
      category: 'Furniture',
      image: 'https://picsum.photos/200/200?random=4',
      description: 'Ergonomic office chair',
      stock: 8
    }
  ])

  const isLoading = ref(false)
  const error = ref(null)

  const productsByCategory = computed(() => {
    return (category) => {
      if (!category) return products.value
      return products.value.filter(p => p.category === category)
    }
  })

  const categories = computed(() => {
    return [...new Set(products.value.map(p => p.category))]
  })

  const searchProducts = computed(() => {
    return (query) => {
      if (!query) return products.value
      return products.value.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    }
  })

  const getProductById = computed(() => {
    return (id) => products.value.find(p => p.id === id)
  })

  async function loadProducts() {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (e) {
      error.value = 'Failed to load products'
    } finally {
      isLoading.value = false
    }
  }

  function updateStock(productId, quantity) {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.stock -= quantity
    }
  }

  return {
    products,
    isLoading,
    error,
    productsByCategory,
    categories,
    searchProducts,
    getProductById,
    loadProducts,
    updateStock
  }
})