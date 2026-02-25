<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center text-gray-900">
      <h1 class="text-2xl font-bold">Products Management</h1>
      <button 
        @click="openAddModal"
        class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition flex items-center"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add Product
      </button>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full md:w-96">
        <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        <input
          v-model="productStore.searchQuery"
          type="text"
          placeholder="Search products..."
          class="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
        />
      </div>
      
      <div class="flex items-center gap-4 w-full md:w-auto">
        <select
          v-model="productStore.selectedCategory"
          class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900"
        >
          <option value="">All Categories</option>
          <option v-for="cat in productStore.categories" :key="cat" :value="cat">
            {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="productStore.loading && !productStore.paginatedProducts.length" class="p-12 flex flex-col items-center justify-center text-gray-500">
        <Loader2 class="w-8 h-8 animate-spin mb-2 text-primary-600" />
        <p>Loading products...</p>
      </div>
      
      <div v-else-if="productStore.error" class="p-12 text-center text-red-600">
        {{ productStore.error }}
        <button @click="productStore.fetchProducts" class="ml-4 underline">Try again</button>
      </div>

      <div v-else class="flex flex-col h-full">
        <div class="overflow-x-auto flex-1">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="product in productStore.paginatedProducts" :key="product.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <img :src="product.image" class="w-10 h-10 rounded-lg object-contain bg-white border mr-3" />
                    <span class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ product.title }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-600 capitalize">{{ product.category }}</span>
                </td>
                <td class="px-6 py-4 text-sm font-semibold text-gray-900">
                  ${{ product.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">In Stock</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button @click="openEditModal(product)" class="p-2 text-gray-400 hover:text-primary-600 transition">
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button @click="confirmDelete(product)" class="p-2 text-gray-400 hover:text-red-600 transition">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="productStore.filteredProducts.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  No products found matching your criteria.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <p class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ Math.min((productStore.currentPage - 1) * productStore.itemsPerPage + 1, productStore.filteredProducts.length) }}</span> to 
            <span class="font-medium">{{ Math.min(productStore.currentPage * productStore.itemsPerPage, productStore.filteredProducts.length) }}</span> of 
            <span class="font-medium">{{ productStore.filteredProducts.length }}</span> results
          </p>
          <div class="flex gap-2">
            <button 
              @click="productStore.currentPage--" 
              :disabled="productStore.currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white disabled:opacity-50 text-gray-700"
            >
              Previous
            </button>
            <button 
              @click="productStore.currentPage++" 
              :disabled="productStore.currentPage >= productStore.totalPages"
              class="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white disabled:opacity-50 text-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <ProductModal 
      :is-open="isModalOpen"
      :product="selectedProduct"
      :categories="productStore.categories"
      :loading="productStore.loading"
      @close="isModalOpen = false"
      @save="handleSaveProduct"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Search, Pencil, Trash2, Loader2 } from 'lucide-vue-next'
import { useProductStore } from '@/stores/products'
import ProductModal from '@/components/products/ProductModal.vue'

const productStore = useProductStore()
const isModalOpen = ref(false)
const selectedProduct = ref(null)

onMounted(() => {
  productStore.fetchProducts()
  productStore.fetchCategories()
})

function openAddModal() {
  selectedProduct.value = null
  isModalOpen.value = true
}

function openEditModal(product) {
  selectedProduct.value = { ...product }
  isModalOpen.value = true
}

async function handleSaveProduct(productData) {
  let success = false
  if (selectedProduct.value) {
    success = await productStore.updateProduct(selectedProduct.value.id, productData)
  } else {
    success = await productStore.addProduct(productData)
  }
  
  if (success) {
    isModalOpen.value = false
  }
}

function confirmDelete(product) {
  if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
    productStore.deleteProduct(product.id)
  }
}
</script>
