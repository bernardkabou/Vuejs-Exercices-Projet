<template>
  <div class="page">
    <h1>Create Post</h1>

    <form class="form" @submit.prevent="handleSubmit">
      <label>
        Title
        <input v-model="form.title" required />
      </label>

      <label>
        Body
        <textarea v-model="form.body" rows="8" required></textarea>
      </label>

      <div class="actions">
        <button type="submit" :disabled="postsStore.isLoading">
          {{ postsStore.isLoading ? 'Creating...' : 'Create' }}
        </button>
        <RouterLink to="/posts" class="cancel">Cancel</RouterLink>
      </div>

      <p v-if="postsStore.error" class="error">{{ postsStore.error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const router = useRouter()
const postsStore = usePostsStore()

const form = ref({
  title: '',
  body: '',
  userId: 1
})

async function handleSubmit() {
  const result = await postsStore.createPost(form.value)
  if (result.success) {
    alert('Post created!')
    router.push('/posts')
  } else {
    alert(`Error: ${result.error}`)
  }
}
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}
.form {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}
label {
  display: block;
  margin-bottom: 16px;
}
input, textarea {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  background: #22c55e;
  color: white;
  cursor: pointer;
}
.cancel {
  text-decoration: none;
  color: #6b7280;
}
.error {
  margin-top: 10px;
  color: #ef4444;
}
</style>