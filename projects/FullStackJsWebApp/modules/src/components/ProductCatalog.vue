<template>
  <div class="catalog-box">
    <div class="header-row">
      <h2>Available Store Items</h2>
      <button class="toggle-admin-btn" v-if="currentUserRoleId === 2" @click="showAdminForm = !showAdminForm">
        {{ showAdminForm ? 'Close Admin Panel' : 'Open Admin Panel' }}
      </button>
    </div>

    <div v-if="showAdminForm && currentUserRoleId === 2" class="admin-panel">
      <h3>Add New Product to Catalog</h3>
      <form @submit.prevent="handleCreateProduct" class="inline-form">
        <input v-model="newProduct.name" placeholder="Name" required />
        <input v-model="newProduct.description" placeholder="Description" required />
        <input v-model.number="newProduct.price" type="number" step="0.01" placeholder="Price ($)" required />
        <input v-model.number="newProduct.stock_quantity" type="number" placeholder="Stock Qty" required />
        <button type="submit" class="save-btn">Insert Row</button>
      </form>
    </div>

    <div class="grid">
      <div v-for="product in products" :key="product.id" class="card">
        <h4>{{ product.name }}</h4>
        <p class="desc">{{ product.description }}</p>
        <p class="price">${{ product.price.toFixed(2) }}</p>
        <p class="stock">In Stock: {{ product.stock_quantity }}</p>
        <button class="add-btn" @click="handleAddToCart(product.id)">Add to Bag</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { ecommerceApi } from '../api/ecommerceApi';

defineProps({
  currentUserId: { type: Number, default: 1 },
  currentUserRoleId: { type: Number, default: 1}
});

const emit = defineEmits(['item-added-to-cart']);
const products = ref([]);
const showAdminForm = ref(false);

// Reactive object holding form inputs
const defaultForm = { name: '', description: '', price: '', stock_quantity: '' };
const newProduct = ref({ ...defaultForm });

const loadCatalog = async () => {
  try {
    products.value = await ecommerceApi.getProducts();
  } catch (err) {
    console.error("Failed loading shop items:", err.message);
  }
};

const handleCreateProduct = async () => {
  try {
    await ecommerceApi.createProduct(newProduct.value);
    alert('Product added successfully!');
    newProduct.value = { ...defaultForm }; // Clear inputs
    await loadCatalog(); // Refresh this component's data grid immediately
  } catch (err) {
    alert(err.message);
  }
};

// READ/UPDATE: Adds item to cart database table
const handleAddToCart = async (productId) => {
  try {
    await ecommerceApi.addToCart(productId);
    emit('item-added-to-cart');
  } catch (err) {
    alert(err.message);
  }
};

onMounted(loadCatalog);
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.toggle-admin-btn { background: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; }
.toggle-admin-btn:hover { background: #5a6268; }

.admin-panel { background: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 8px; margin-bottom: 25px; }
.admin-panel h3 { margin-top: 0; color: #856404; }
.inline-form { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.inline-form input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
.save-btn { grid-column: span 2; background: #28a745; color: white; border: none; padding: 8px; border-radius: 4px; font-weight: bold; cursor: pointer; }
.save-btn:hover { background: #218838; }

.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
.card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff; }
.desc { color: #666; font-size: 0.9rem; margin: 5px 0; }
.price { font-weight: bold; color: #2c3e50; font-size: 1.1rem; }
.stock { font-size: 0.8rem; color: #95a5a6; margin-bottom: 10px; }
.add-btn { background: #3498db; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; width: 100%; }
.add-btn:hover { background: #2980b9; }
</style>