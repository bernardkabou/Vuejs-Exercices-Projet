<template>
  <div class="product-list">
    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="search-input"
      >

      <select v-model="selectedCategory" class="category-select">
        <option value="">All Categories</option>
        <option
          v-for="category in productsStore.categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div v-if="productsStore.isLoading" class="loading">
      Loading products...
    </div>

    <div v-else class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <p v-if="filteredProducts.length === 0" class="no-results">
      No products found
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from './ProductCard.vue'

const productsStore = useProductsStore()

const searchQuery = ref('')
const selectedCategory = ref('')

const filteredProducts = computed(() => {
  let result = productsStore.products

  if (searchQuery.value) {
    result = productsStore.searchProducts(searchQuery.value)
  }

  if (selectedCategory.value) {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  return result
})
</script>

<style scoped>
.product-list {
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input,
.category-select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>