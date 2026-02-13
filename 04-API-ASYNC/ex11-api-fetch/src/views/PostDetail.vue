<template>
  <div class="detail" v-if="!postsStore.isLoading && postsStore.currentPost">
    <button class="back" @click="$router.back()">← Back</button>

    <article class="card">
      <h1>{{ postsStore.currentPost.title }}</h1>
      <p class="body">{{ postsStore.currentPost.body }}</p>
      <p class="meta">Post ID: {{ postsStore.currentPost.id }}</p>
    </article>

    <section class="comments">
      <h2>Comments</h2>
      <div v-if="postsStore.comments.length">
        <div v-for="c in postsStore.comments" :key="c.id" class="comment">
          <h3>{{ c.name }}</h3>
          <p class="email">{{ c.email }}</p>
          <p>{{ c.body }}</p>
        </div>
      </div>
      <p v-else>No comments.</p>
    </section>
  </div>

  <div v-else-if="postsStore.isLoading" class="loading">
    <div class="spinner"></div>
    <p>Loading post...</p>
  </div>

  <div v-else-if="postsStore.error" class="error">
    <p>Error: {{ postsStore.error }}</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '../stores/posts'

const route = useRoute()
const postsStore = usePostsStore()

onMounted(() => {
  postsStore.fetchPost(route.params.id)
})
</script>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}
.back {
  margin-bottom: 16px;
  border: none;
  background: #e5e7eb;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 10px rgba(15,23,42,0.04);
}
.body {
  margin: 12px 0;
}
.meta {
  color: #6b7280;
  font-size: 0.9rem;
}
.comments {
  margin-top: 24px;
}
.comment {
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  background: #f9fafb;
}
.email {
  font-size: 0.85rem;
  color: #6b7280;
}
.loading, .error {
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