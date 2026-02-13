<template>
  <div class="profile">
    <h1>Profile: {{ username }}</h1>
    <p>This is the profile page for user <strong>{{ username }}</strong>.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  username: String
})
</script>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log("Entering profile page for:", to.params.username)
    next()
  }
}
</script>

<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>