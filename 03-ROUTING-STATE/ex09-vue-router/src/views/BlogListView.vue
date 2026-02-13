<template>
  <div class="blog-list-view">
    <h1>Blog Posts</h1>

    <div class="posts-grid">
      <div
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        @click="goToPost(post.id)"
      >
        <img :src="post.image" :alt="post.title" />
        <h2>{{ post.title }}</h2>
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="meta">
          <span>{{ post.author }}</span>
          <span>{{ post.date }}</span>
        </div>
        <RouterLink :to="{ name: 'blog-post', params: { id: post.id } }" class="read-more">
          Read More →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue Router',
    excerpt: 'Learn the basics of routing in Vue.js applications...',
    author: 'John Doe',
    date: '2026-01-20',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 2,
    title: 'Advanced Routing Techniques',
    excerpt: 'Explore advanced patterns and techniques...',
    author: 'Jane Smith',
    date: '2026-01-22',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 3,
    title: 'Navigation Guards Explained',
    excerpt: 'Understanding and implementing navigation guards...',
    author: 'Bob Johnson',
    date: '2026-01-24',
    image: 'httpsum.photos/400/300?random=3'
  }
])

function goToPost(id) {
  router.push({ name: 'blog-post', params: { id } })
}
</script>

<style scoped>
.blog-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.post-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.read-more {
  display: inline-block;
  padding: 8px 16px;
  margin: 10px 15px 15px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>