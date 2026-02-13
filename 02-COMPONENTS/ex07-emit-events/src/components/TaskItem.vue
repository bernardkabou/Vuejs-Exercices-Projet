<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-content">
      <h3>{{ task.title }}</h3>
      <p class="task-description">{{ task.description }}</p>
      <span class="task-date">{{ task.createdAt }}</span>
    </div>

    <div class="task-actions">
      <button 
        @click="$emit('toggle-complete', task.id)"
        :class="{ active: task.completed }"
      >
        {{ task.completed ? 'Undo' : 'Complete' }}
      </button>

      <button @click="$emit('edit', task.id)">
        Edit
      </button>

      <button @click="handleDelete" class="danger">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits({
  'toggle-complete': id => typeof id === 'number',
  'edit': id => typeof id === 'number',
  'delete': id => typeof id === 'number'
})

function handleDelete() {
  if (confirm('Are you sure you want to delete this task?')) {
    emit('delete', props.task.id)
  }
}
</script>

<style scoped>
.task-item {
  background: white;
  padding: 1.3rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s ease;
}

.task-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.task-content h3 {
  margin: 0;
  font-size: 1.2rem;
}

.task-description {
  margin: 0.3rem 0;
  color: #475569;
}

.task-date {
  font-size: 0.8rem;
  color: #94a3b8;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.45rem 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #e2e8f0;
  transition: 0.2s;
  font-size: 0.9rem;
}

button:hover {
  background: #cbd5e1;
}

button.active {
  background: #22c55e;
  color: white;
}

button.danger {
  background: #ef4444;
  color: white;
}

button.danger:hover {
  background: #dc2626;
}

.completed {
  opacity: 0.6;
  text-decoration: line-through;
}
</style>