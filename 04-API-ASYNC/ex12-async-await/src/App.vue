<template>
  <div class="app">
    <header class="topbar">
      <h1>Async/Await Patterns</h1>
      <nav class="nav">
        <RouterLink to="/weather">Weather</RouterLink>
        <RouterLink to="/async-demo">Async Demo</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #f3f4f6;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: #111827;
  color: white;
  font-family: system-ui, sans-serif;
}

.nav {
  display: flex;
  gap: 12px;
}

.nav a {
  color: #e5e7eb;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
}

.nav a.router-link-active {
  background: #2563eb;
  color: white;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
</style>