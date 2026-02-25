import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const isAuthenticated = computed(() => !!user.value)

    async function login(credentials) {
        // Mock login for now
        if (credentials.username === 'admin' && credentials.password === 'admin') {
            const mockUser = {
                id: 1,
                username: 'admin',
                name: 'John Doe',
                role: 'Administrator',
                avatar: 'https://i.pravatar.cc/150?u=admin'
            }
            user.value = mockUser
            localStorage.setItem('user', JSON.stringify(mockUser))
            return { success: true }
        }
        throw new Error('Invalid credentials')
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
        router.push('/login')
    }

    return {
        user,
        isAuthenticated,
        login,
        logout
    }
})
