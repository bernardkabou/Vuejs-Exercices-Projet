import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'

export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    const categories = ref([])
    const selectedCategory = ref('')
    const searchQuery = ref('')

    const filteredProducts = computed(() => {
        return products.value.filter(product => {
            const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
            return matchesCategory && matchesSearch
        })
    })

    const currentPage = ref(1)
    const itemsPerPage = ref(8)

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return filteredProducts.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

    async function fetchProducts() {
        loading.value = true
        error.value = null
        try {
            products.value = await apiService.products.getAll()
        } catch (err) {
            error.value = 'Failed to load products'
        } finally {
            loading.value = false
        }
    }

    async function fetchCategories() {
        try {
            categories.value = await apiService.products.getCategories()
        } catch (err) {
            console.error('Failed to load categories', err)
        }
    }

    async function addProduct(productData) {
        loading.value = true
        try {
            const newProduct = { ...productData, id: Date.now() }
            products.value.unshift(newProduct)
            return true
        } catch (err) {
            error.value = 'Failed to add product'
            return false
        } finally {
            loading.value = false
        }
    }

    async function updateProduct(id, productData) {
        loading.value = true
        try {
            const index = products.value.findIndex(p => p.id === id)
            if (index !== -1) {
                products.value[index] = { ...products.value[index], ...productData }
            }
            return true
        } catch (err) {
            error.value = 'Failed to update product'
            return false
        } finally {
            loading.value = false
        }
    }

    async function deleteProduct(id) {
        try {
            // Simulate delete call to API
            products.value = products.value.filter(p => p.id !== id)
            return true
        } catch (err) {
            error.value = 'Failed to delete product'
            return false
        }
    }

    return {
        products,
        loading,
        error,
        categories,
        selectedCategory,
        searchQuery,
        currentPage,
        itemsPerPage,
        filteredProducts,
        paginatedProducts,
        totalPages,
        fetchProducts,
        fetchCategories,
        addProduct,
        updateProduct,
        deleteProduct
    }
})
