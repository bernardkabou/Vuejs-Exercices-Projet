import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([])
  const currentPost = ref(null)
  const comments = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const currentPage = ref(1)
  const postsPerPage = ref(10)

  const totalPages = computed(() =>
    Math.ceil(posts.value.length / postsPerPage.value)
  )

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage.value
    const end = start + postsPerPage.value
    return posts.value.slice(start, end)
  })

  async function fetchPosts() {
    isLoading.value = true
    error.value = null
    try {
      posts.value = await api.get('/posts')
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch posts:', e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPost(id) {
    isLoading.value = true
    error.value = null
    try {
      currentPost.value = await api.get(`/posts/${id}`)
      comments.value = await api.get(`/posts/${id}/comments`)
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch post:', e)
    } finally {
      isLoading.value = false
    }
  }

  async function createPost(postData) {
    isLoading.value = true
    error.value = null
    try {
      const newPost = await api.post('/posts', postData)
      posts.value.unshift(newPost)
      return { success: true, post: newPost }
    } catch (e) {
      error.value = e.message
      console.error('Failed to create post:', e)
      return { success: false, error: e.message }
    } finally {
      isLoading.value = false
    }
  }

  async function updatePost(id, postData) {
    isLoading.value = true
    error.value = null
    try {
      const updatedPost = await api.put(`/posts/${id}`, postData)
      const index = posts.value.findIndex(p => p.id === id)
      if (index !== -1) posts.value[index] = updatedPost
      return { success: true, post: updatedPost }
    } catch (e) {
      error.value = e.message
      console.error('Failed to update post:', e)
      return { success: false, error: e.message }
    } finally {
      isLoading.value = false
    }
  }

  async function deletePost(id) {
    isLoading.value = true
    error.value = null
    try {
      await api.delete(`/posts/${id}`)
      posts.value = posts.value.filter(p => p.id !== id)
      return { success: true }
    } catch (e) {
      error.value = e.message
      console.error('Failed to delete post:', e)
      return { success: false, error: e.message }
    } finally {
      isLoading.value = false
    }
  }

  function setPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  function previousPage() {
    if (currentPage.value > 1) currentPage.value--
  }

  return {
    posts,
    currentPost,
    comments,
    isLoading,
    error,
    currentPage,
    postsPerPage,
    totalPages,
    paginatedPosts,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setPage,
    nextPage,
    previousPage
  }
})