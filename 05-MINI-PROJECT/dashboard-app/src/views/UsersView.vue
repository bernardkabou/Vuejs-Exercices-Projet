<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center text-gray-900">
      <h1 class="text-2xl font-bold">User Management</h1>
      <button class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition flex items-center">
        <UserPlus class="w-4 h-4 mr-2" />
        Add User
      </button>
    </div>

    <!-- User Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-gray-900">
      <div class="p-4 border-b border-gray-100 flex items-center">
        <div class="relative w-full md:w-80">
          <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            v-model="userStore.searchQuery"
            type="text"
            placeholder="Search users..."
            class="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div v-if="userStore.loading" class="p-12 flex flex-col items-center justify-center text-gray-500">
        <Loader2 class="w-8 h-8 animate-spin mb-2 text-primary-600" />
        <p>Loading users...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="user in userStore.filteredUsers" :key="user.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold mr-3">
                    {{ user.name.firstname[0] }}{{ user.name.lastname[0] }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 capitalize">{{ user.name.firstname }} {{ user.name.lastname }}</p>
                    <p class="text-xs text-gray-500">@{{ user.username }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-900">{{ user.email }}</p>
                <p class="text-xs text-gray-500">{{ user.phone }}</p>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600 capitalize">
                {{ user.address.city }}, {{ user.address.street }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">User</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="viewUser(user)" class="text-gray-400 hover:text-primary-600 p-2 border-none">
                  <Eye class="w-4 h-4" />
                </button>
                <button class="text-gray-400 hover:text-red-600 p-2 border-none">
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Modal -->
    <UserModal 
      :is-open="isModalOpen"
      :user="selectedUser"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserPlus, Search, Eye, Trash2, Loader2 } from 'lucide-vue-next'
import { useUserStore } from '@/stores/users'
import UserModal from '@/components/users/UserModal.vue'

const userStore = useUserStore()
const isModalOpen = ref(false)
const selectedUser = ref(null)

onMounted(() => {
  userStore.fetchUsers()
})

function viewUser(user) {
  selectedUser.value = user
  isModalOpen.value = true
}
</script>
