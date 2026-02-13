<template>
  <div>
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
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>