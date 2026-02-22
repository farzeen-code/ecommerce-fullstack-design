import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const productAPI = {
  // Get all products
  getAllProducts: () => api.get('/products'),
  
  // Get single product by ID
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Search products
  searchProducts: (query) => api.get(`/products/search?q=${query}`),
  
  // Filter by category
  getProductsByCategory: (category) => api.get(`/products/search?category=${category}`),
  
  // Get featured products
  getFeaturedProducts: () => api.get('/products/featured'),
  
  // Create product (admin)
  createProduct: (productData) => api.post('/products', productData),
  
  // Update product (admin)
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  
  // Delete product (admin)
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default api;