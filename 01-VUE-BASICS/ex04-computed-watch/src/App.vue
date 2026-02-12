<template>
  <div class="shopping-cart">
    <h1>Shopping Cart</h1>

    <!-- Search -->
    <input 
      v-model="searchQuery" 
      placeholder="Search items..." 
      class="search"
    />

    <!-- Cart Items -->
    <div class="cart-items">
      <h2>Items ({{ itemCount }})</h2>

      <div 
        v-for="item in filteredItems" 
        :key="item.id" 
        class="cart-item"
      >
        <h3>{{ item.name }}</h3>
        <p>Price: {{ formatCurrency(item.price) }}</p>

        <label>
          Quantity:
          <input 
            type="number" 
            min="1" 
            v-model.number="item.quantity"
          />
        </label>

        <button @click="removeItem(item.id)">Remove</button>
      </div>

      <p v-if="filteredItems.length === 0">No items match your search.</p>
    </div>

    <!-- Add Item -->
    <div class="add-item">
      <h2>Add Item</h2>
      <input v-model="newItemName" placeholder="Name" />
      <input v-model.number="newItemPrice" type="number" placeholder="Price" />
      <input v-model.number="newItemQuantity" type="number" placeholder="Qty" />
      <button @click="addItem">Add</button>
    </div>

    <!-- Discount -->
    <div class="discount-section">
      <input v-model="discountCode" placeholder="Enter discount code" />

      <p v-if="isDiscountValid" class="success">Valid code!</p>
      <p v-else-if="discountCode" class="error">Invalid code</p>
    </div>

    <!-- Summary -->
    <div class="cart-summary">
      <p>Subtotal: {{ formattedSubtotal }}</p>
      <p>Tax ({{ taxRate }}%): {{ formattedTax }}</p>
      <p>Shipping: {{ formattedShipping }}</p>

      <p v-if="discountAmount > 0" class="discount">
        Discount: -{{ formattedDiscount }}
      </p>

      <h2>Total: {{ formattedTotal }}</h2>

      <button :disabled="isCheckoutDisabled">Checkout</button>
    </div>

    <!-- Statistics -->
    <div class="statistics">
      <h3>Statistics</h3>
      <p>Most expensive: {{ mostExpensive?.name }} ({{ formatCurrency(mostExpensive?.price) }})</p>
      <p>Cheapest: {{ cheapest?.name }} ({{ formatCurrency(cheapest?.price) }})</p>
      <p>Average item price: {{ formatCurrency(averageItemPrice) }}</p>
      <p>Total savings: {{ formatCurrency(discountAmount) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// ----------------------
// DATA
// ----------------------
const cartItems = ref([
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 25, quantity: 2 },
  { id: 3, name: 'Keyboard', price: 75, quantity: 1 }
])

const taxRate = ref(10)
const discountCode = ref('')
const shippingCost = ref(15)
const searchQuery = ref('')

const validDiscountCodes = {
  'SAVE10': 10,
  'SAVE20': 20,
  'WELCOME': 5
}

// Add item form
const newItemName = ref('')
const newItemPrice = ref(0)
const newItemQuantity = ref(1)

// ----------------------
// COMPUTED PROPERTIES
// ----------------------
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const tax = computed(() => subtotal.value * (taxRate.value / 100))

const discountPercent = computed(() =>
  validDiscountCodes[discountCode.value] || 0
)

const discountAmount = computed(() =>
  subtotal.value * (discountPercent.value / 100)
)

const total = computed(() =>
  subtotal.value + tax.value + shippingCost.value - discountAmount.value
)

const itemCount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

const isDiscountValid = computed(() =>
  discountCode.value in validDiscountCodes
)

const filteredItems = computed(() =>
  cartItems.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const mostExpensive = computed(() =>
  [...cartItems.value].sort((a, b) => b.price - a.price)[0]
)

const cheapest = computed(() =>
  [...cartItems.value].sort((a, b) => a.price - b.price)[0]
)

const averageItemPrice = computed(() =>
  subtotal.value / itemCount.value
)

const isCheckoutDisabled = computed(() =>
  cartItems.value.length === 0 || total.value <= 0
)

// Formatted values
const formattedSubtotal = computed(() => formatCurrency(subtotal.value))
const formattedTax = computed(() => formatCurrency(tax.value))
const formattedShipping = computed(() => formatCurrency(shippingCost.value))
const formattedDiscount = computed(() => formatCurrency(discountAmount.value))
const formattedTotal = computed(() => formatCurrency(total.value))

// ----------------------
// WATCHERS
// ----------------------
watch(subtotal, (newVal, oldVal) => {
  console.log(`Subtotal changed from ${oldVal} to ${newVal}`)
})

watch(discountCode, () => {
  console.log("Discount code changed:", discountCode.value)
})

watch(cartItems, () => {
  console.log("Cart updated:", cartItems.value)
}, { deep: true })

watch(total, (newVal) => {
  if (newVal > 500) {
    alert("Warning: total exceeds $500!")
  }
})

// ----------------------
// METHODS
// ----------------------
function addItem() {
  if (!newItemName.value || newItemPrice.value <= 0) return

  cartItems.value.push({
    id: Date.now(),
    name: newItemName.value,
    price: newItemPrice.value,
    quantity: newItemQuantity.value
  })

  newItemName.value = ''
  newItemPrice.value = 0
  newItemQuantity.value = 1
}

function removeItem(id) {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}

function formatCurrency(value) {
  return `$${value.toFixed(2)}`
}
</script>

<style scoped>
.shopping-cart {
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

.cart-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.success {
  color: green;
}

.error {
  color: red;
}

.discount {
  color: blue;
}

.search {
  margin-bottom: 20px;
  padding: 8px;
  width: 300px;
}
</style>