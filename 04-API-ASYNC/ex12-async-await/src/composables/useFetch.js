import { ref, unref, watchEffect } from 'vue'

export function useFetch(url, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const abortController = ref(null)

  async function execute() {
    isLoading.value = true
    error.value = null

    if (abortController.value) {
      abortController.value.abort()
    }

    abortController.value = new AbortController()

    try {
      const response = await fetch(unref(url), {
        ...options,
        signal: abortController.value.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      data.value = await response.json()
    } catch (e) {
      if (e.name !== 'AbortError') {
        error.value = e.message
      }
    } finally {
      isLoading.value = false
    }
  }

  if (options.immediate !== false) {
    execute()
  }

  if (options.watch !== false) {
    watchEffect(() => {
      if (unref(url)) {
        execute()
      }
    })
  }

  function cancel() {
    if (abortController.value) {
      abortController.value.abort()
    }
  }

  return {
    data,
    error,
    isLoading,
    execute,
    cancel
  }
}