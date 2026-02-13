<template>
  <div class="home">
    <h1>Welcome to My Blog</h1>
    <p>This is the home page of your Vue Router application.</p>

    <RouterLink to="/blog" class="btn">View Blog Posts</RouterLink>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 40px;
}

.btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}
</style>