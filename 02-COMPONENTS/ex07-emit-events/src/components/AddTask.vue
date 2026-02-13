<template>
  <form @submit.prevent="handleSubmit" class="add-task-form">
    <input
      v-model="title"
      type="text"
      placeholder="Task title"
      class="task-input"
    >

    <textarea
      v-model="description"
      placeholder="Description (optional)"
      class="task-textarea"
    ></textarea>

    <button type="submit" :disabled="!title.trim()">
      Add Task
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const description = ref('')
const error = ref('')

const emit = defineEmits(['add-task'])

function handleSubmit() {
  if (!title.value.trim()) {
    error.value = 'Title is required'
    return
  }

  const newTask = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    completed: false,
    createdAt: new Date().toISOString()
  }

  emit('add-task', newTask)

  title.value = ''
  description.value = ''
  error.value = ''
}
</script>

<style scoped>
.add-task-form {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-input,
.task-textarea {
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  transition: 0.2s;
}

.task-input:focus,
.task-textarea:focus {
  border-color: #2563eb;
  outline: none;
}

button {
  padding: 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

button:hover {
  background: #1d4ed8;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  font-size: 0.9rem;
}
</style>