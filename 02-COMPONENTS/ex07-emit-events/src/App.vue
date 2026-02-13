<template>
  <div class="app">
    <header>
      <h1>Task Manager</h1>
    </header>

    <main>
      <AddTask @add-task="addTask" />

      <div class="filters">
        <SearchFilter v-model="searchQuery" />
        <StatusFilter @filter-change="handleFilterChange" />
      </div>

      <div class="task-stats">
        <p>Total: {{ tasks.length }}</p>
        <p>Active: {{ activeTasks }}</p>
        <p>Completed: {{ completedTasks }}</p>
      </div>

      <div class="task-list">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggle-complete="toggleComplete"
          @edit="editTask"
          @delete="deleteTask"
        />

        <p v-if="filteredTasks.length === 0" class="empty-state">
          No tasks found
        </p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskItem from './components/TaskItem.vue'
import AddTask from './components/AddTask.vue'
import SearchFilter from './components/SearchFilter.vue'
import StatusFilter from './components/StatusFilter.vue'

const tasks = ref([
  {
    id: 1,
    title: 'Learn Vue.js Components',
    description: 'Master component basics',
    completed: false,
    createdAt: '2026-01-20'
  },
  {
    id: 2,
    title: 'Understand Props',
    description: 'Learn how to pass data to components',
    completed: true,
    createdAt: '2026-01-21'
  }
])

const searchQuery = ref('')
const currentFilter = ref('all')

// Event handlers
function addTask(task) {
  tasks.value.unshift(task)
}

function toggleComplete(taskId) {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) task.completed = !task.completed
}

function editTask(taskId) {
  const task = tasks.value.find(t => t.id === taskId)
  const newTitle = prompt('Edit task:', task.title)
  if (newTitle) task.title = newTitle
}

function deleteTask(taskId) {
  tasks.value = tasks.value.filter(t => t.id !== taskId)
}

function handleFilterChange(filter) {
  currentFilter.value = filter
}

// Computed
const filteredTasks = computed(() => {
  let result = tasks.value

  if (searchQuery.value) {
    result = result.filter(task =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (currentFilter.value === 'active') {
    result = result.filter(task => !task.completed)
  } else if (currentFilter.value === 'completed') {
    result = result.filter(task => task.completed)
  }

  return result
})

const activeTasks = computed(() =>
  tasks.value.filter(t => !t.completed).length
)

const completedTasks = computed(() =>
  tasks.value.filter(t => t.completed).length
)
</script>

<style scoped>
.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", system-ui, sans-serif;
  color: #0f172a;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #1e293b;
}

.filters {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.5rem 0;
}

.task-stats {
  display: flex;
  justify-content: space-between;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  color: #64748b;
  margin-top: 2rem;
  font-size: 1.1rem;
}
</style>