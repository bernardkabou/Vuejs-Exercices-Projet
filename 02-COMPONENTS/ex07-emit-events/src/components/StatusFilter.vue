<template>
  <div class="status-filter">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="selectFilter(filter.value)"
      :class="{ active: currentFilter === filter.value }"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
]

const currentFilter = ref('all')

const emit = defineEmits(['filter-change'])

function selectFilter(filter) {
  currentFilter.value = filter
  emit('filter-change', filter)
}
</script>

<style scoped>
.status-filter {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  background: #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #cbd5e1;
}

button.active {
  background: #2563eb;
  color: white;
}
</style>