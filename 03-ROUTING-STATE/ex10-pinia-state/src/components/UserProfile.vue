<template>
  <div class="profile">
    <h2>User Profile</h2>

    <!-- LOGIN FORM -->
    <div v-if="!userStore.isAuthenticated" class="login-section">
      <h3>Login</h3>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="handleLogin">Login</button>

      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- PROFILE INFO -->
    <div v-else class="profile-info">
      <img :src="userStore.user.avatar" class="avatar" />

      <h3>{{ userStore.fullName }}</h3>
      <p>{{ userStore.user.email }}</p>

      <button @click="userStore.logout" class="logout-btn">Logout</button>

      <h4>Update Profile</h4>

      <input v-model="firstName" placeholder="First Name" />
      <input v-model="lastName" placeholder="Last Name" />

      <button @click="updateProfile">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref('')

const firstName = ref('')
const lastName = ref('')

function handleLogin() {
  const result = userStore.login(email.value, password.value)
  if (!result.success) {
    error.value = result.error
  }
}

function updateProfile() {
  userStore.updateProfile({
    firstName: firstName.value || userStore.user.firstName,
    lastName: lastName.value || userStore.user.lastName
  })

  alert('Profile updated!')
}
</script>

<style scoped>
.profile {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  max-width: 500px;
  margin: 0 auto;
}

.login-section,
.profile-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}

button {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.logout-btn {
  background: #ef4444;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>