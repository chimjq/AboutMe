<template>
  <div class="login-box">
    <h2>Account Authentication</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email Address:</label>
        <input v-model="credentials.email" type="email" placeholder="name@example.com" required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input v-model="credentials.password" type="password" placeholder="••••••••" required />
      </div>
      <button type="submit" class="login-btn">Secure Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { ecommerceApi } from '../api/ecommerceApi'; // Importing the identical data engine tracking file

const emit = defineEmits(['login-success']);
const credentials = ref({ email: '', password: '' });

const handleLogin = async () => {
  try {
    const data = await ecommerceApi.loginUser(credentials.value);
    
    alert(data.message); // Displays "Login successful!"
    emit('login-success', data.user); // Passes the clean user payload up to App.vue
  } catch (err) {
    alert(err.message); // Safely displays server-side validation or password failure errors
  }
};
</script>