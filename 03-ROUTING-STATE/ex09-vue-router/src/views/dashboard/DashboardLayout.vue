<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <h2>Dashboard</h2>
      <RouterLink to="/dashboard/overview">Overview</RouterLink>
      <RouterLink to="/dashboard/settings">Settings</RouterLink>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.sidebar {
  width: 200px;
  background: #f1f5f9;
  padding: 20px;
  border-radius: 8px;
}

.sidebar a {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #1e293b;
}

.content {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>