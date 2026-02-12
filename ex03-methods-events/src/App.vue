<template>
  <div class="counter-app" @keyup="handleKey" tabindex="0">
    <h1>Interactive Counter</h1>

    <!-- Display current count -->
    <div class="counter-display">
      <h2>Count: {{ count }}</h2>
      <p v-if="warning" class="warning">{{ warning }}</p>
    </div>

    <!-- Basic controls -->
    <div class="controls">
      <button @click="increment">+1</button>
      <button @click="decrement">-1</button>
      <button @click="reset">Reset</button>
    </div>

    <!-- Custom amount form -->
    <form @submit.prevent="addCustomAmount" class="custom-form">
      <input v-model.number="customAmount" type="number" min="1" />
      <button type="submit">Add</button>
    </form>

    <!-- Advanced controls -->
    <div class="advanced-controls">
      <button @dblclick="incrementBy(10)">Double-click: +10</button>
      <button @click.right.prevent="decrementBy(5)">Right-click: -5</button>
    </div>

    <!-- History -->
    <div class="history">
      <h3>Click History</h3>
      <ul>
        <li v-for="(entry, index) in history" :key="index">
          {{ entry }}
        </li>
      </ul>
      <button @click="clearHistory">Clear History</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const customAmount = ref(1)
const history = ref([])
const warning = ref("")

// --- METHODS ---
function increment() {
  if (count.value >= 100) return showWarning("Maximum reached (100)")
  count.value++
  addHistory("Incremented by 1")
}

function decrement() {
  if (count.value <= 0) return showWarning("Minimum reached (0)")
  count.value--
  addHistory("Decremented by 1")
}

function reset() {
  count.value = 0
  addHistory("Reset counter")
}

function incrementBy(amount) {
  if (count.value + amount > 100) return showWarning("Cannot exceed 100")
  count.value += amount
  addHistory(`Incremented by ${amount}`)
}

function decrementBy(amount) {
  if (count.value - amount < 0) return showWarning("Cannot go below 0")
  count.value -= amount
  addHistory(`Decremented by ${amount}`)
}

function addCustomAmount() {
  incrementBy(customAmount.value)
}

// --- HISTORY ---
function addHistory(action) {
  const time = new Date().toLocaleTimeString()
  history.value.push(`${action} at ${time}`)
}

function clearHistory() {
  history.value = []
}

// --- WARNINGS ---
function showWarning(msg) {
  warning.value = msg
  setTimeout(() => (warning.value = ""), 1500)
}

// --- KEYBOARD EVENTS ---
function handleKey(event) {
  if (event.key === "ArrowUp") increment()
  if (event.key === "ArrowDown") decrement()
  if (event.key === " ") reset()
}
</script>

<style scoped>
.counter-app {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  font-family: Arial, sans-serif;
  outline: none;
}

.controls button,
.advanced-controls button,
.custom-form button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

.warning {
  color: red;
  font-weight: bold;
}

.history {
  margin-top: 30px;
  text-align: left;
}
</style>