<template>
  <div class="cart">
    <h2>Shopping Cart ({{ cartStore.itemCount }} items)</h2>

    <div v-if="cartStore.isEmpty" class="empty-cart">
      <p>Your cart is empty</p>
    </div>

    <div v-else>
      <div class="cart-items">
        <div
          v-for="item in cartStore.cartItems"
          :key="item.productId"
          class="cart-item"
        >
          <img :src="item.product.image" :alt="item.product.name" />
          <div class="item-details">
            <h4>{{ item.product.name }}</h4>
            <p>${{ item.product.price }}</p>
          </div>

          <div class="quantity-controls">
            <button @click="cartStore.updateQuantity(item.productId, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item.productId, item.quantity + 1)">+</button>
          </div>

          <p class="item-total">${{ item.itemTotal }}</p>

          <button @click="cartStore.removeFromCart(item.productId)" class="remove-btn">
            Remove
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (10%):</span>
          <span>${{ cartStore.tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ cartStore.total.toFixed(2) }}</span>
        </div>

        <button @click="handleCheckout" class="checkout-btn">
          Checkout
        </button>
        <button @click="cartStore.clearCart" class="clear-btn">
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

function handleCheckout() {
  const result = cartStore.checkout()
  alert(result.message)
}
</script>

<style scoped>
.cart {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  margin-bottom: 12px;
  background: #f8fafc;
}

.cart-item img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  padding: 6px 10px;
  background: #e2e8f0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.item-total {
  font-weight: 700;
  color: #2563eb;
}

.cart-summary {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.clear-btn {
  width: 100%;
  padding: 12px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
}
</style>