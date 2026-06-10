const API_BASE = 'http://localhost:5000/api';

export const ecommerceApi = {
  async getProducts() {
    const res = await fetch(`${API_BASE}/products`);
    return await res.json();
  },

  async getCart() {
    const res = await fetch(`${API_BASE}/cart`);
    return await res.json();
  },

  async addToCart(productId, quantity = 1) {
    const res = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    return await res.json();
  },

  // --- NEW: DELETE FROM CART ---
  async removeFromCart(cartItemId) {
    const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  async checkout() {
    const res = await fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST'
    });
    return await res.json();
  },

  // --- NEW: READ ORDER HISTORY ---
  async getOrderHistory() {
    const res = await fetch(`${API_BASE}/orders`);
    return await res.json();
  },
  
  async createProduct(productData) {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData) // Sends name, description, price, stock
    });
    if (!res.ok) throw new Error('Failed to create new product entry.');
    return await res.json();
  },

  async loginUser(credentials) {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await res.json();
    
    // If the Express server throws a 401 or 500, forward the custom error payload message
    if (!res.ok) {
      throw new Error(data.message || 'Authentication routine failed.');
    }
    
    return data; // Returns the full matching { message, user } data contract
  }
};