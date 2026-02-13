<template>
  <div class="blog-post-view">
    <button @click="goBack" class="back-btn">← Back to Blog</button>

    <article v-if="post" class="post">
      <h1>{{ post.title }}</h1>
      <div class="meta">
        <span>By {{ post.author }}</span>
        <span>{{ post.date }}</span>
      </div>
      <img :src="post.image" :alt="post.title" />
      <div class="content">
        {{ post.content }}
      </div>
      <div class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </article>

    <div v-else class="error">
      <p>Post not found</p>
      <button @click="goToBlog">View All Posts</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const post = ref(null)

const posts = [
  {
    id: 1,
    title: 'Getting Started with Vue Router',
    author: 'John Doe',
    date: '2026-01-20',
    image: 'https://picsum.photos/800/400?random=1',
    content: 'Vue Router is the official router for Vue.js...',
    tags: ['Vue', 'Router', 'Tutorial']
  },
  {
    id: 2,
    title: 'Advanced Routing Techniques',
    author: 'Jane Smith',
    date: '2026-01-22',
    image: 'https://picsum.photos/800/400?random=2',
    content: 'Learn advanced routing patterns...',
    tags: ['Vue', 'Advanced', 'Routing']
  }
]

onMounted(() => {
  const postId = parseInt(route.params.id)
  post.value = posts.find(p => p.id === postId)
})

function goBack() {
  router.back()
}

function goToBlog() {
  router.push({ name: 'blog' })
}
</script>

<style scoped>
.blog-post-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-btn {
  margin-bottom: 20px;
  padding: 8px 16px;
  background: #e2e8f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.post img {
  width: 100%;
  border-radius: 8px;
  margin: 20px 0;
}

.tag {
  display: inline-block;
  background: #e2e8f0;
  padding: 4px 10px;
  border-radius: 6px;
  margin-right: 6px;
}
</style>