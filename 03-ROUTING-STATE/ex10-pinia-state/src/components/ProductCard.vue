<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="description">{{ product.description }}</p>
    <p class="category">{{ product.category }}</p>
    <p class="price">${{ product.price }}</p>
    <p class="stock" :class="{ 'low-stock': product.stock < 5 }">
      {{ product.stock }} in stock
    </p>
    <button
      @click="handleAddToCart"
      :disabled="product.stock === 0"
      class="add-to-cart-btn"
    >
      {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: Object
})

const cartStore = useCartStore()

function handleAddToCart() {
  cartStore.addToCart(props.product.id)
  alert(`${props.product.name} added to cart!`)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.product-card img {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

h3 {
  margin: 10px 0 5px;
  font-size: 1.2rem;
}

.description {
  color: #475569;
  font-size: 0.9rem;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2563eb;
  margin: 10px 0;
}

.stock {
  font-size: 0.9rem;
  color: #475569;
}

.low-stock {
  color: #ef4444;
  font-weight: 600;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.add-to-cart-btn:hover {
  background: #1d4ed8;
}

.add-to-cart-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>