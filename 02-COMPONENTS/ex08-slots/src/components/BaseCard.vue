<template>
  <div class="base-card">
    <slot>
      <p class="empty">No content provided</p>
    </slot>
  </div>
</template>

<style scoped>
.base-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.empty {
  color: #94a3b8;
  font-style: italic;
}
</style>