<template>
  <div class="tabs">
    <div class="tab-labels">
      <slot name="labels"></slot>
    </div>

    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-labels {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-labels button {
  background: #e2e8f0;
  color: #0f172a;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.tab-labels button:hover {
  background: #cbd5e1;
}

.tab-content {
  padding: 1rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}
</style>