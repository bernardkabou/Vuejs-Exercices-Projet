<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <RouterLink to="/" class="btn">Go Home</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}

h1 {
  font-size: 100px;
  margin: 0;
  color: #3b82f6;
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