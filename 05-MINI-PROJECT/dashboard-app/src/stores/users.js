import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiService } from '@/services/api'

export const useUserStore = defineStore('users', () => {
    const users = ref([])
    const loading = ref(false)
    const error = ref(null)
    const searchQuery = ref('')

    const filteredUsers = computed(() => {
        return users.value.filter(user => {
            const name = `${user.name.firstname} ${user.name.lastname}`.toLowerCase()
            return name.includes(searchQuery.value.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        })
    })

    async function fetchUsers() {
        loading.value = true
        error.value = null
        try {
            users.value = await apiService.users.getAll()
        } catch (err) {
            error.value = 'Failed to load users'
        } finally {
            loading.value = false
        }
    }

    return {
        users,
        loading,
        error,
        searchQuery,
        filteredUsers,
        fetchUsers
    }
})
