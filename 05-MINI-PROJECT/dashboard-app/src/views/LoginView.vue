<template>
  <div class="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0f]">
    <!-- Animated Mesh Gradient Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -inset-[100%] opacity-50">
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div class="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="text-center mb-10 translate-y-[-20px] animate-fade-in">
        <div class="inline-flex items-center justify-center p-3 mb-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
          <LayoutDashboard class="w-10 h-10 text-primary-400" />
        </div>
        <h2 class="text-4xl font-black text-white tracking-tight mb-2">
          Admin <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">Panel</span>
        </h2>
        <p class="text-gray-400 font-medium">
          Sign in to your e-commerce command center
        </p>
      </div>

      <!-- Glassmorphism Card -->
      <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-8 sm:p-10 animate-slide-up">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-1">
            <label for="username" class="block text-sm font-semibold text-gray-300 ml-1">
              Username
            </label>
            <div class="relative transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500/50 rounded-xl">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                placeholder="admin"
                class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary-500 transition-all sm:text-sm"
              />
              <User class="absolute right-4 top-3 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div class="space-y-1">
            <label for="password" class="block text-sm font-semibold text-gray-300 ml-1">
              Password
            </label>
            <div class="relative transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500/50 rounded-xl">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                placeholder="••••••••"
                class="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-primary-500 transition-all sm:text-sm"
              />
              <Lock class="absolute right-4 top-3 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div v-if="error" class="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl animate-shake">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:translate-y-[-2px]"
          >
            <span class="absolute right-4 translate-x-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight class="w-5 h-5" />
            </span>
            <span v-if="loading">Decrypting...</span>
            <span v-else>Authorize Entry</span>
          </button>
        </form>
        
        <div class="mt-8 pt-6 border-t border-white/10">
          <div class="flex items-center justify-center space-x-2 text-xs">
            <span class="text-gray-500">Security Credentials:</span>
            <span class="px-2 py-1 bg-white/5 rounded-md text-primary-400 font-mono">admin / admin</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LayoutDashboard, User, Lock, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form)
    router.push('/')
  } catch (err) {
    error.value = 'Invalid username or password'
  } finally {
    loading.value = false
  }
}
</script>
