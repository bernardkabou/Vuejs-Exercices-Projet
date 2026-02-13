<template>
  <div class="app">
    <h1>Pinia Shopping Cart</h1>

    <UserProfile />

    <hr />

    <ProductList />

    <hr />

    <Cart />
  </div>
</template>

<script setup>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import UserProfile from './components/UserProfile.vue'
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", system-ui, sans-serif;
  color: #0f172a;
}

h1 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e293b;
}

hr {
  margin: 40px 0;
  border: none;
  border-top: 1px solid #e2e8f0;
}
</style>