<template>
  <div class="posts-list">
    <div class="header">
      <h1>Blog Posts</h1>
      <RouterLink to="/posts/new" class="create-btn">Create Post</RouterLink>
    </div>

    <div v-if="postsStore.isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading posts...</p>
    </div>

    <div v-else-if="postsStore.error" class="error">
      <p>Error: {{ postsStore.error }}</p>
      <button @click="postsStore.fetchPosts()">Retry</button>
    </div>

    <div v-else>
      <div class="posts-grid">
        <div
          v-for="post in postsStore.paginatedPosts"
          :key="post.id"
          class="post-card"
        >
          <h2>{{ post.title }}</h2>
          <p class="excerpt">{{ post.body.substring(0, 120) }}...</p>
          <div class="actions">
            <RouterLink :to="`/posts/${post.id}`" class="view-btn">View</RouterLink>
            <RouterLink :to="`/posts/${post.id}/edit`" class="edit-btn">Edit</RouterLink>
            <button @click="handleDelete(post.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button @click="postsStore.previousPage()" :disabled="postsStore.currentPage === 1">
          Previous
        </button>
        <span>Page {{ postsStore.currentPage }} of {{ postsStore.totalPages }}</span>
        <button
          @click="postsStore.nextPage()"
          :disabled="postsStore.currentPage === postsStore.totalPages"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()

onMounted(() => {
  if (!postsStore.posts.length) postsStore.fetchPosts()
})

async function handleDelete(id) {
  if (!confirm('Delete this post?')) return
  const result = await postsStore.deletePost(id)
  alert(result.success ? 'Post deleted' : `Error: ${result.error}`)
}
</script>

<style scoped>
.posts-list {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: system-ui, sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.create-btn {
  padding: 8px 16px;
  background: #22c55e;
  color: white;
  border-radius: 8px;
  text-decoration: none;
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
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.post-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 10px rgba(15,23,42,0.04);
}
.excerpt {
  color: #6b7280;
  margin: 8px 0 12px;
}
.actions {
  display: flex;
  gap: 8px;
}
.actions a, .actions button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
}
.view-btn { background: #2563eb; color: white; text-decoration: none; }
.edit-btn { background: #f59e0b; color: white; text-decoration: none; }
.delete-btn { background: #ef4444; color: white; }
.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
}
.pagination button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
}
.pagination button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>