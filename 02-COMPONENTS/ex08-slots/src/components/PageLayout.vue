<template>
  <div class="layout">
    <header class="layout-header">
      <slot name="header"></slot>
    </header>

    <aside class="layout-sidebar">
      <slot name="sidebar"></slot>
    </aside>

    <main class="layout-main">
      <slot></slot>
    </main>

    <footer class="layout-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  gap: 20px;
  margin-top: 20px;
}

.layout-header,
.layout-sidebar,
.layout-main,
.layout-footer {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.layout-header { grid-area: header; }
.layout-sidebar { grid-area: sidebar; }
.layout-main { grid-area: main; }
.layout-footer { grid-area: footer; }
</style>