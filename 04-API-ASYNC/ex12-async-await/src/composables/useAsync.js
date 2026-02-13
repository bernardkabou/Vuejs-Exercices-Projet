import { ref } from 'vue'

export function useAsync(asyncFunction, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)
  const retryCount = ref(0)

  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError = null,
    onSuccess = null
  } = options

  async function execute(...args) {
    isLoading.value = true
    error.value = null
    retryCount.value = 0

    return executeWithRetry(args)
  }

  async function executeWithRetry(args, attempt = 0) {
    try {
      const result = await asyncFunction(...args)
      data.value = result
      isLoading.value = false

      if (onSuccess) {
        onSuccess(result)
      }

      return result
    } catch (e) {
      if (attempt < maxRetries) {
        retryCount.value = attempt + 1
        const delay = retryDelay * Math.pow(2, attempt)

        await new Promise(resolve => setTimeout(resolve, delay))
        return executeWithRetry(args, attempt + 1)
      } else {
        error.value = e.message
        isLoading.value = false

        if (onError) {
          onError(e)
        }

        throw e
      }
    }
  }

  async function retry() {
    return execute()
  }

  return {
    data,
    error,
    isLoading,
    retryCount,
    execute,
    retry
  }
}