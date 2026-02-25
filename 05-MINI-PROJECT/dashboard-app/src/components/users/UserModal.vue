<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <h3 class="text-lg font-bold text-gray-900">User Details</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div v-if="user" class="p-8">
        <div class="flex flex-col items-center text-center mb-8 text-gray-900">
          <div class="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-3xl font-bold mb-4">
            {{ user.name.firstname[0] }}{{ user.name.lastname[0] }}
          </div>
          <h4 class="text-xl font-bold capitalize">{{ user.name.firstname }} {{ user.name.lastname }}</h4>
          <p class="text-gray-500">@{{ user.username }}</p>
          <span class="mt-2 px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
            Customer
          </span>
        </div>

        <div class="grid grid-cols-2 gap-6 text-gray-900">
          <div>
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
            <p class="text-sm font-medium">{{ user.email }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
            <p class="text-sm font-medium">{{ user.phone }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
            <p class="text-sm font-medium capitalize">
              {{ user.address.number }} {{ user.address.street }}, {{ user.address.city }} {{ user.address.zipcode }}
            </p>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <button
          @click="$emit('close')"
          class="px-6 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean,
  user: Object
})

defineEmits(['close'])
</script>
