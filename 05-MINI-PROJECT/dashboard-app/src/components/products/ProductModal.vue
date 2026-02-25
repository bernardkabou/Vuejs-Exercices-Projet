<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
        <h3 class="text-lg font-bold text-gray-900">{{ product ? 'Edit Product' : 'Add New Product' }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 overflow-y-auto">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
            placeholder="Enter product title"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
              placeholder="0.00"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white text-gray-900"
            >
              <option value="" disabled>Select category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
            placeholder="Product description..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            v-model="form.image"
            type="url"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div v-if="form.image" class="mt-2 flex justify-center">
          <img :src="form.image" class="h-32 object-contain rounded-lg border p-2" @error="handleImageError" />
        </div>
      </form>

      <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button
          @click="$emit('close')"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  product: Object,
  categories: Array,
  loading: Boolean
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  price: 0,
  category: '',
  description: '',
  image: ''
})

watch(() => props.product, (newProduct) => {
  if (newProduct) {
    Object.assign(form, { ...newProduct })
  } else {
    Object.assign(form, {
      title: '',
      price: 0,
      category: '',
      description: '',
      image: ''
    })
  }
}, { immediate: true })

function handleSubmit() {
  emit('save', { ...form })
}

function handleImageError(e) {
  e.target.src = 'https://via.placeholder.com/150?text=No+Image'
}
</script>
