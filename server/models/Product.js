const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['electronics', 'clothing', 'accessories', 'home', 'sports', 'books']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  brand: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Product', productSchema);