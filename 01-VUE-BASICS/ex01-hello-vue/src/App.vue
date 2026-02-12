<template>
  <div class="container">
    <h1>Hello Vue!</h1>

    <p>Welcome, {{ name }}!</p>

    <input 
      type="text" 
      v-model="name" 
      placeholder="Enter your name"
    />

    <p class="date">Today is: {{ formattedDate }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// reactive name
const name = ref("Bernard")

// reactive date
const currentDate = ref(new Date())

// formatted date
const formattedDate = computed(() =>
  currentDate.value.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
)
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 80px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

input {
  margin-top: 20px;
  padding: 10px;
  width: 80%;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.date {
  margin-top: 30px;
  font-style: italic;
  color: #555;
}
</style>