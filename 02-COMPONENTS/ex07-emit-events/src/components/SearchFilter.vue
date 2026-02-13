<template>
  <div class="search-filter">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Search tasks..."
      class="search-input"
    >
    <button v-if="modelValue" @click="$emit('update:modelValue', '')">
      Clear
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.search-input {
  flex: 1;
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
}

button {
  padding: 0.6rem 1rem;
  background: #e2e8f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #cbd5e1;
}
</style>