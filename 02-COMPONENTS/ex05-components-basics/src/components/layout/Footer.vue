<template>
  <footer class="footer">
    <p>© 2026 My Awesome Blog — All rights reserved.</p>
    <div class="links">
      <a href="#">Twitter</a>
      <a href="#">LinkedIn</a>
      <a href="#">GitHub</a>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 2rem 1rem;
  background: #0f172a;
  color: white;
  margin-top: 3rem;
}

.links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

a {
  color: #93c5fd;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>