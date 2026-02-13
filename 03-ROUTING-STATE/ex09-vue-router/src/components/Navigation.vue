<template>
  <nav class="nav">
    <div class="logo">MyBlog</div>

    <ul class="links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/blog">Blog</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
      <li>
        <RouterLink :to="{ name: 'profile', params: { username: 'johndoe' } }">
          Profile
        </RouterLink>
      </li>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
    </ul>

    <button @click="toggleAuth" class="auth-btn">
      {{ isAuthenticated ? 'Logout' : 'Login' }}
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
})

function toggleAuth() {
  isAuthenticated.value = !isAuthenticated.value
  localStorage.setItem('isAuthenticated', isAuthenticated.value)
}
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  padding: 15px 30px;
  background: #1e293b;
  color: white;
  gap: 20px;
}

.logo {
  font-size: 22px;
  font-weight: bold;
}

.links {
  display: flex;
  list-style: none;
  gap: 20px;
  flex: 1;
}

.links a {
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
}

.links a.router-link-active {
  background: #3b82f6;
}

.auth-btn {
  background: #3b82f6;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}
</style>