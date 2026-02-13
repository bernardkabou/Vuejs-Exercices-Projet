<template>
  <article class="blog-post">
    <h2 class="post-title">{{ title }}</h2>

    <div class="post-meta">
      <span class="author">{{ author }}</span>
      <span class="date">{{ date }}</span>
    </div>

    <p class="post-excerpt">{{ excerpt }}</p>

    <button class="read-more">Read More</button>
  </article>
</template>

<script setup>
// Hardcoded data for now (props in ex06)
const title = "My First Blog Post"
const author = "John Doe"
const date = "January 25, 2026"
const excerpt = "This is a short excerpt of my blog post..."
</script>

<style scoped>
.blog-post {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.post-title {
  margin: 0;
  font-size: 1.6rem;
}

.post-meta {
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  gap: 1rem;
}

.read-more {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.read-more:hover {
  background: #1d4ed8;
}
</style>