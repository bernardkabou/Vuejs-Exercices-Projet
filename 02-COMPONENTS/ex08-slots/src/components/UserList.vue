<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-item">
      <slot :user="user" :index="users.indexOf(user)">
        <div class="default-user">
          <img :src="user.avatar" :alt="user.name">
          <div>
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: Array
})
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.default-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.default-user img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
</style>