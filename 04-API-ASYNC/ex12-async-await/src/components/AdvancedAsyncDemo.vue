<template>
  <div class="async-demo">
    <h1>Advanced Async Patterns</h1>

    <section class="demo-section">
      <h2>1. Parallel Requests (Promise.all)</h2>
      <button @click="runParallelRequests" :disabled="loading.parallel">
        {{ loading.parallel ? 'Loading...' : 'Fetch 3 Posts in Parallel' }}
      </button>
      <p v-if="results.parallel" class="result">
        Loaded {{ results.parallel.length }} posts in {{ timing.parallel }}ms
      </p>
    </section>

    <section class="demo-section">
      <h2>2. Sequential Requests</h2>
      <button @click="runSequentialRequests" :disabled="loading.sequential">
        {{ loading.sequential ? 'Loading...' : 'Fetch Posts Sequentially' }}
      </button>
      <p v-if="results.sequential" class="result">
        Loaded {{ results.sequential.length }} posts in {{ timing.sequential }}ms
      </p>
    </section>

    <section class="demo-section">
      <h2>3. Race Condition (Promise.race)</h2>
      <button @click="runRaceCondition" :disabled="loading.race">
        {{ loading.race ? 'Racing...' : 'Race Multiple APIs' }}
      </button>
      <p v-if="results.race" class="result">
        Fastest response: {{ results.race.source }} ({{ timing.race }}ms)
      </p>
    </section>

    <section class="demo-section">
      <h2>4. All Settled (Handle Failures)</h2>
      <button @click="runAllSettled" :disabled="loading.allSettled">
        {{ loading.allSettled ? 'Loading...' : 'Fetch with Some Failures' }}
      </button>
      <div v-if="results.allSettled" class="result">
        <p>Successful: {{ results.allSettled.successful }}</p>
        <p>Failed: {{ results.allSettled.failed }}</p>
      </div>
    </section>

    <section class="demo-section">
      <h2>5. Request with Timeout</h2>
      <button @click="runWithTimeout" :disabled="loading.timeout">
        {{ loading.timeout ? 'Loading...' : 'Fetch with 2s Timeout' }}
      </button>
      <p v-if="results.timeout" class="result">{{ results.timeout }}</p>
      <p v-if="errors.timeout" class="error">{{ errors.timeout }}</p>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const loading = reactive({
  parallel: false,
  sequential: false,
  race: false,
  allSettled: false,
  timeout: false
})

const results = reactive({
  parallel: null,
  sequential: null,
  race: null,
  allSettled: null,
  timeout: null
})

const timing = reactive({
  parallel: 0,
  sequential: 0,
  race: 0
})

const errors = reactive({
  timeout: null
})

async function runParallelRequests() {
  loading.parallel = true
  const start = Date.now()

  try {
    const promises = [
      fetch('https://jsonplaceholder.typicode.com/posts/1'),
      fetch('https://jsonplaceholder.typicode.com/posts/2'),
      fetch('https://jsonplaceholder.typicode.com/posts/3')
    ]

    const responses = await Promise.all(promises)
    results.parallel = await Promise.all(responses.map(r => r.json()))
    timing.parallel = Date.now() - start
  } finally {
    loading.parallel = false
  }
}

async function runSequentialRequests() {
  loading.sequential = true
  const start = Date.now()

  try {
    const posts = []

    for (let i = 1; i <= 3; i++) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
      const post = await response.json()
      posts.push(post)
    }

    results.sequential = posts
    timing.sequential = Date.now() - start
  } finally {
    loading.sequential = false
  }
}

async function runRaceCondition() {
  loading.race = true
  const start = Date.now()

  try {
    const promises = [
      fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => ({ source: 'JSONPlaceholder', data: r })),
      fetch('https://restcountries.com/v3.1/name/france').then(r => ({ source: 'REST Countries', data: r })),
      new Promise(resolve => setTimeout(() => resolve({ source: 'Timeout', data: null }), 3000))
    ]

    results.race = await Promise.race(promises)
    timing.race = Date.now() - start
  } finally {
    loading.race = false
  }
}

async function runAllSettled() {
  loading.allSettled = true

  try {
    const promises = [
      fetch('https://jsonplaceholder.typicode.com/posts/1'),
      fetch('https://jsonplaceholder.typicode.com/invalid-endpoint'),
      fetch('https://jsonplaceholder.typicode.com/posts/2')
    ]

    const settled = await Promise.allSettled(promises)

    results.allSettled = {
      successful: settled.filter(r => r.status === 'fulfilled').length,
      failed: settled.filter(r => r.status === 'rejected').length
    }
  } finally {
    loading.allSettled = false
  }
}

async function runWithTimeout() {
  loading.timeout = true
  errors.timeout = null
  results.timeout = null

  try {
    const fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts/1')
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 2000)
    )

    const response = await Promise.race([fetchPromise, timeoutPromise])
    const data = await response.json()
    results.timeout = `Success! Post title: ${data.title}`
  } catch (e) {
    errors.timeout = e.message
  } finally {
    loading.timeout = false
  }
}
</script>

<style scoped>
.async-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}

.demo-section {
  background: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.demo-section button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.demo-section button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result {
  margin-top: 10px;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
}

.error {
  margin-top: 10px;
  padding: 10px;
  background: #ffebee;
  color: #c62828;
  border-radius: 4px;
}
</style>