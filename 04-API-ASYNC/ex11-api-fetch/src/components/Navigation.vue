<template>
  <nav class="nav">
    <div class="logo">API Blog</div>
    <ul class="links">
      <li><RouterLink to="/posts">Posts</RouterLink></li>
      <li><RouterLink to="/posts/new">Create</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: #1e293b;
  color: white;
  font-family: system-ui, sans-serif;
}
.logo {
  font-weight: 700;
}
.links {
  display: flex;
  gap: 16px;
  list-style: none;
}
a {
  color: white;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
}
a.router-link-active {
  background: #2563eb;
}
</style>