import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', () => {
  const productsStore = useProductsStore()

  const items = ref([])

  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    items.value = JSON.parse(savedCart)
  }

  const itemCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((total, item) => {
      const product = productsStore.getProductById(item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  )

  const tax = computed(() => subtotal.value * 0.1)

  const total = computed(() => subtotal.value + tax.value)

  const cartItems = computed(() =>
    items.value.map(item => {
      const product = productsStore.getProductById(item.productId)
      return {
        ...item,
        product,
        itemTotal: product ? product.price * item.quantity : 0
      }
    })
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addToCart(productId, quantity = 1) {
    const existing = items.value.find(i => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      })
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(i => i.productId !== productId)
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(i => i.productId === productId)
    if (!item) return

    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  function checkout() {
    items.value.forEach(item => {
      productsStore.updateStock(item.productId, item.quantity)
    })

    clearCart()

    return {
      success: true,
      message: 'Order placed successfully!'
    }
  }

  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  return {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    cartItems,
    isEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout
  }
})