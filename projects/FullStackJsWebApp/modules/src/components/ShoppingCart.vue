<template>
  <div class="cart-box">
    <h2>Your Shopping Bag</h2>
    <div v-if="cartItems.length === 0" class="empty">Your bag is empty.</div>
    
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} x{{ item.quantity }} - <strong>${{ (item.price * item.quantity).toFixed(2) }}</strong>
        </li>
      </ul>
      <div class="total">Grand Total: ${{ cartTotal.toFixed(2) }}</div>
      <button class="checkout-btn" @click="handleCheckout">Place Order</button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import { ecommerceApi } from '../api/ecommerceApi';

const props = defineProps({
  cartItems: { type: Array, required: true }
});

const emit = defineEmits(['order-completed']);

// Dynamically compute the total cost exactly like a computed property in C#
const cartTotal = computed(() => {
  return props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const handleCheckout = async () => {
  try {
    const result = await ecommerceApi.checkout();
    if (result.success) {
      alert(`Order Placed Successfully! Your transaction ID is #${result.orderId}`);
      // Notify parent page that order is complete to refresh UI bounds
      emit('order-completed');
    }
  } catch (err) {
    alert(err.message);
  }
};
</script>

<style scoped>
.cart-box { background: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; }
ul { list-style: none; padding: 0; }
li { padding: 8px 0; border-bottom: 1px dashed #ddd; display: flex; justify-content: space-between; }
.total { font-size: 1.2rem; font-weight: bold; margin-top: 15px; text-align: right; }
.checkout-btn { background: #2ecc71; color: white; border: none; width: 100%; padding: 10px; border-radius: 4px; font-size: 1rem; margin-top: 10px; cursor: pointer; }
.checkout-btn:hover { background: #27ae60; }
.empty { color: #7f8c8d; text-align: center; padding: 20px; }
</style>