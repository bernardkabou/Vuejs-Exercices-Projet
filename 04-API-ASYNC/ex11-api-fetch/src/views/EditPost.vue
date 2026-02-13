<template>
  <div class="page" v-if="loaded">
    <h1>Edit Post</h1>

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
          {{ postsStore.isLoading ? 'Updating...' : 'Update' }}
        </button>
        <RouterLink to="/posts" class="cancel">Cancel</RouterLink>
      </div>

      <p v-if="postsStore.error" class="error">{{ postsStore.error }}</p>
    </form>
  </div>

  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Loading post...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const route = useRoute()
const router = useRouter()
const postsStore = usePostsStore()

const form = ref({ title: '', body: '' })
const loaded = ref(false)

onMounted(async () => {
  await postsStore.fetchPost(route.params.id)
  if (postsStore.currentPost) {
    form.value.title = postsStore.currentPost.title
    form.value.body = postsStore.currentPost.body
    loaded.value = true
  }
})

async function handleSubmit() {
  const result = await postsStore.updatePost(route.params.id, form.value)
  if (result.success) {
    alert('Post updated!')
    router.push(`/posts/${route.params.id}`)
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
  background: #2563eb;
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
.loading {
  text-align: center;
  padding: 40px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>