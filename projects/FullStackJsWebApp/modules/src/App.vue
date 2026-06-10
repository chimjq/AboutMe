<template>
  <div class="container">
    <header>
      <h1>E-Commerce Management Console</h1>
    </header>
    <div v-if="!currentUser" class="auth-wrapper">
      <UserLogin @login-success="setSessionUser" />
      <p class="demo-tip">💡 Hint: Register an account first via Postman or use existing database records to login.</p>
    </div>
    
    <div v-else>
      <header class="app-header">
        <div>
          <h1>Management Platform</h1>
          <p class="welcome-text">Active Profile: <strong>{{ currentUser.email }}</strong>(ID: {{ currentUser.id }})<br/>Role:  <strong>{{ currentUser.role_name }}</strong></p>
        </div>
        <button class="logout-btn" @click="handleLogout">Sign Out</button>
      </header>

      <ProductCatalog 
        ref="catalogComponent" 
        :currentUserId="currentUser.id" 
        :currentUserRoleId="currentUser.role_id" 
        :currentUserRoleName="currentUser.role_name" 
        @item-added-to-cart="syncAllData" 
      />

      <main class="layout">
        <section class="right-col">
          <ShoppingCart 
            :cartItems="cartItems" 
            @cart-updated="syncAllData" 
            @order-completed="handleOrderCompleted" 
          />
        </section>
        
        <hr class="divider" />

        <section class="order-history-section">
          <h2>Your Historical Orders</h2>
          <div v-if="orders.length === 0" class="empty-orders">No historical transactions found in database.</div>
          <table v-else class="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date/Time Completed</th>
                <th>Total Price Paid</th>
                <th>Status Badge</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>#{{ order.id }}</td>
                <td>{{ order.created_at }}</td>
                <td class="amount">${{ order.total_amount.toFixed(2) }}</td>
                <td><span class="badge">{{ order.order_status }}</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ecommerceApi } from './api/ecommerceApi';
import UserLogin from './components/UserLogin.vue';
import ProductCatalog from './components/ProductCatalog.vue';
import ShoppingCart from './components/ShoppingCart.vue';

const currentUser = ref(null);
const cartItems = ref([]);
const orders = ref([]);
const catalogComponent = ref(null);

// Triggered when UserLogin component emits 'login-success'
const setSessionUser = (userRow) => {
  currentUser.value = userRow;
  syncAllData(); // Populates cart data for the newly authenticated profile
};

const handleLogout = () => {
  currentUser.value = null;
  cartItems.value = [];
  orders.value = [];
};

// Central synchronized pull state tool
const syncAllData = async () => {
  if (!currentUser.value) return;
  try {
    cartItems.value = await ecommerceApi.getCart();
    orders.value = await ecommerceApi.getOrderHistory();
  } catch (err) {
    console.error('Session sync error:', err.message);
  }
};

const handleOrderCompleted = async () => {
  // 1. Sync global cart items and historic ledger lines
  await syncAllData();
  
  // 2. Reach inside the catalog component and fire its internal SQL selector refresh
  if (catalogComponent.value) {
    await catalogComponent.value.loadCatalog();
  }
};

onMounted(syncAllData);
</script>

<style>
.container { max-width: 1000px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif; }
.layout { display: flex; gap: 40px; }
.left-col { flex: 2; }
.right-col { flex: 1; min-width: 320px; }
.divider { margin: 40px 0; border: 0; border-top: 2px solid #eee; }
.order-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
.order-table th, .order-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
.order-table th { background-color: #f4f6f7; }
.amount { font-weight: bold; color: #27ae60; }
.badge { background: #2ecc71; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; }
.empty-orders { color: #7f8c8d; font-style: italic; padding: 10px 0; }
</style>