<template>
  <div class="flex flex-col w-64 bg-white border-r border-gray-200">
    <div class="flex items-center h-16 px-6 bg-primary-600 text-white">
      <LayoutDashboard class="w-8 h-8 mr-2" />
      <span class="text-xl font-bold">AdminPanel</span>
    </div>
    
    <nav class="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"
        active-class="bg-primary-50 text-primary-600 font-semibold"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>
    
    <div class="p-4 border-t border-gray-200">
      <button
        @click="authStore.logout"
        class="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut class="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  LogOut 
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Products', path: '/products', icon: ShoppingBag },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
]
</script>
