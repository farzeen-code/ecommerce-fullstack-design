const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts,
  seedProducts
} = require('../controllers/productController');

// Seed route (must come before /:id)
router.get('/seed', seedProducts);
router.post('/seed', seedProducts);

// Search and featured routes (must come before /:id)
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);

// CRUD routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;