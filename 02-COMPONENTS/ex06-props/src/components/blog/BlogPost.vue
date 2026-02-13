<template>
  <article class="blog-post">
    <span class="category-badge">{{ category }}</span>

    <h2>{{ title }}</h2>

    <div class="author-info">
      <img :src="author.avatar" :alt="author.name" class="avatar" />
      <div>
        <p class="author-name">{{ author.name }}</p>
        <p class="post-date">{{ formattedDate }}</p>
      </div>
    </div>

    <p class="excerpt">{{ excerpt }}</p>

    <div class="tags">
      <span v-for="tag in tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>

    <div class="meta">
      <span>{{ readingTime }} min read</span>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  author: {
    type: Object,
    required: true,
    validator: (value) => value.name && value.avatar
  },
  date: { type: String, required: true },
  excerpt: { type: String, default: 'No excerpt available' },
  category: {
    type: String,
    required: true,
    validator: (value) =>
      ['Technology', 'Science', 'Arts', 'Business'].includes(value)
  },
  tags: { type: Array, default: () => [] }
})

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  const words = props.excerpt.split(' ').length
  return Math.ceil(words / 200)
})
</script>

<style scoped>
.blog-post {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.category-badge {
  background: #2563eb;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
}
.author-info {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tags {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
.tag {
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>