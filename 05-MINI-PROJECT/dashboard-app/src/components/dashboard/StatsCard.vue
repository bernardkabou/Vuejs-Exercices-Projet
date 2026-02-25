<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
    <div :class="`p-3 rounded-xl ${colorClass} mr-4`">
      <component :is="icon" class="w-6 h-6" />
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500">{{ title }}</p>
      <div class="flex items-baseline">
        <h3 class="text-2xl font-bold text-gray-900">{{ value }}</h3>
        <span v-if="trend" :class="`ml-2 text-xs font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`">
          {{ trend > 0 ? '+' : '' }}{{ trend }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
  trend: Number,
  colorClass: {
    type: String,
    default: 'bg-primary-50 text-primary-600'
  }
})
</script>
