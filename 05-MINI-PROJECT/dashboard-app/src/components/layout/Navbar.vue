<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
    <div class="flex items-center">
      <nav class="flex text-sm font-medium text-gray-500" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link to="/" class="hover:text-primary-600 transition-colors">Admin</router-link>
          </li>
          <li v-if="currentPage && currentPage !== 'Dashboard'" class="flex items-center space-x-2">
            <ChevronRight class="w-4 h-4" />
            <span class="text-primary-600 font-semibold">{{ currentPage }}</span>
          </li>
          <li v-else-if="currentPage === 'Dashboard'" class="flex items-center space-x-2">
            <ChevronRight class="w-4 h-4" />
            <span class="text-primary-600 font-semibold">Dashboard</span>
          </li>
        </ol>
      </nav>
    </div>
    
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all w-64 text-gray-900"
        />
        <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>
      
      <div class="flex items-center space-x-2">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-semibold text-gray-800">{{ authStore.user?.name }}</p>
          <p class="text-xs text-gray-500">{{ authStore.user?.role }}</p>
        </div>
        <img
          :src="authStore.user?.avatar"
          alt="User Avatar"
          class="w-10 h-10 rounded-full border-2 border-primary-100"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { Search, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const currentPage = computed(() => {
  const name = route.name || ''
  if (!name) return ''
  return name.charAt(0).toUpperCase() + name.slice(1)
})
</script>
