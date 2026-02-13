<template>
  <div class="user-card" :class="`size-${size}`">
    <img :src="user.avatar" :alt="user.name" class="avatar" />

    <div class="info">
      <h4>{{ user.name }}</h4>
      <p class="email">{{ user.email }}</p>
      <p v-if="showBio" class="bio">{{ user.bio }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) =>
      value.name && value.email && value.avatar
  },
  showBio: { type: Boolean, default: true },
  size: {
    type: String,
    default: 'medium',
    validator: (value) =>
      ['small', 'medium', 'large'].includes(value)
  }
})
</script>

<style scoped>
.user-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.size-small .avatar { width: 40px; height: 40px; }
.size-large .avatar { width: 80px; height: 80px; }
</style>