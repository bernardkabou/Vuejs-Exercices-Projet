import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const savedAuth = localStorage.getItem('isAuthenticated')
  const savedUser = localStorage.getItem('user')

  if (savedAuth === 'true' && savedUser) {
    isAuthenticated.value = true
    user.value = JSON.parse(savedUser)
  }

  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  })

  const initials = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName[0]}${user.value.lastName[0]}`
  })

  function login(email, password) {
    if (email && password) {
      user.value = {
        id: 1,
        email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
      isAuthenticated.value = true

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(user.value))

      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  function updateProfile(updates) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isAuthenticated,
    fullName,
    initials,
    login,
    logout,
    updateProfile
  }
})