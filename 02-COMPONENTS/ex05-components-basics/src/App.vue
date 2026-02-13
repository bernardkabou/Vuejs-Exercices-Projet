<template>
  <div class="app">
    <Header />

    <main class="blog-container">
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import BlogPost from './components/blog/BlogPost.vue'
</script>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.blog-container {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>