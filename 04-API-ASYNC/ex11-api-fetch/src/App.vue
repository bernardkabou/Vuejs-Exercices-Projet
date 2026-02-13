<template>
  <div class="app">
    <Navigation />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f8fafc;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>