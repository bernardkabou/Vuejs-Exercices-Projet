<template>
  <div class="container">
    <div 
      class="product-card"
      :class="[
        inStock ? 'in-stock' : 'out-of-stock',
        price < 50 ? 'low-price' : '',
        isSelected ? 'selected' : ''
      ]"
      :style="{
        backgroundColor: productColor,
        fontSize: fontSize + 'px',
        borderWidth: quantity + 'px',
        borderStyle: 'solid',
        borderColor: productColor
      }"
      :title="description"
    >
      <img 
        :src="imageUrl" 
        :alt="name"
        class="product-image"
      />

      <h2>{{ name }}</h2>
      <p class="price">{{ price }} €</p>
      <p class="desc">{{ description }}</p>

      <p class="stock">
        {{ inStock ? "In Stock" : "Out of Stock" }}
      </p>

      <label>
        Quantity:
        <input type="number" v-model="quantity" min="1" />
      </label>
    </div>

    <div class="controls">
      <label>
        Product Color:
        <input type="color" v-model="productColor" />
      </label>

      <label>
        Font Size:
        <input type="range" min="12" max="32" v-model="fontSize" />
      </label>

      <label>
        In Stock:
        <input type="checkbox" v-model="inStock" />
      </label>

      <label>
        Select Product:
        <input type="checkbox" v-model="isSelected" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Product data
const name = ref("Wireless Headphones")
const price = ref(39.99)
const imageUrl = ref("https://via.placeholder.com/200")
const description = ref("High-quality wireless headphones with noise cancellation.")
const inStock = ref(true)
const quantity = ref(1)
const productColor = ref("#ffffff")
const fontSize = ref(16)
const isSelected = ref(false)
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  gap: 40px;
  font-family: Arial, sans-serif;
}

.product-card {
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  transition: 0.3s ease;
}

.product-image {
  width: 100%;
  border-radius: 8px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.in-stock {
  color: green;
}

.out-of-stock {
  color: red;
}

.low-price {
  border: 2px solid gold;
}

.selected {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>