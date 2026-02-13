<template>
  <div class="app">
    <Header />

    <main class="blog-container">
      <BlogPost
        v-for="post in blogPosts"
        :key="post.id"
        :title="post.title"
        :author="post.author"
        :date="post.date"
        :excerpt="post.excerpt"
        :category="post.category"
        :tags="post.tags"
      />
    </main>

    <aside class="sidebar">
      <h3>Authors</h3>
      <UserCard
        v-for="user in authors"
        :key="user.id"
        :user="user"
        size="small"
      />
    </aside>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import BlogPost from './components/blog/BlogPost.vue'
import UserCard from './components/UserCard.vue'

const blogPosts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue.js',
    author: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
    date: '2026-01-20',
    excerpt: 'Learn the basics of Vue.js and build your first application...',
    category: 'Technology',
    tags: ['Vue.js', 'JavaScript', 'Tutorial']
  },
  {
    id: 2,
    title: 'Understanding Component Props',
    author: { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    date: '2026-01-22',
    excerpt: 'Deep dive into Vue component props and how to use them effectively...',
    category: 'Technology',
    tags: ['Vue.js', 'Components', 'Props']
  }
])

const authors = ref([
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Vue.js enthusiast and developer'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Frontend developer specializing in Vue'
  }
])
</script>

<style scoped>
.blog-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px;
}
.sidebar {
  margin: 2rem;
}
</style>