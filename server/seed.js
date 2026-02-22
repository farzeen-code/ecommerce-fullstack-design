const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: "Men's Cotton T-Shirt",
    price: 29.99,
    originalPrice: 45.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    category: "clothing",
    stock: 50,
    rating: 4.5,
    reviews: 125,
    brand: "Nike",
    featured: true
  },
  {
    name: "Wireless Headphones",
    price: 79.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Premium wireless headphones with noise cancellation",
    category: "electronics",
    stock: 30,
    rating: 4.7,
    reviews: 234,
    brand: "Sony",
    featured: true
  },
  {
    name: "Smart Watch Series 6",
    price: 299.00,
    originalPrice: 399.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Advanced smartwatch with health tracking features",
    category: "electronics",
    stock: 25,
    rating: 4.8,
    reviews: 445,
    brand: "Apple",
    featured: true
  },
  {
    name: "Winter Jacket",
    price: 120.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description: "Warm winter jacket with waterproof material",
    category: "clothing",
    stock: 40,
    rating: 4.6,
    reviews: 89,
    brand: "North Face",
    featured: false
  },
  {
    name: "Leather Wallet",
    price: 35.00,
    originalPrice: 50.00,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    description: "Premium leather wallet with multiple card slots",
    category: "accessories",
    stock: 100,
    rating: 4.4,
    reviews: 67,
    brand: "Fossil",
    featured: false
  },
  {
    name: "Running Shoes",
    price: 89.99,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Lightweight running shoes with excellent cushioning",
    category: "sports",
    stock: 60,
    rating: 4.7,
    reviews: 312,
    brand: "Adidas",
    featured: true
  },
  {
    name: "Laptop Stand",
    price: 45.00,
    originalPrice: 60.00,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    description: "Ergonomic laptop stand for better posture",
    category: "accessories",
    stock: 75,
    rating: 4.5,
    reviews: 156,
    brand: "Generic",
    featured: false
  },
  {
    name: "Coffee Maker",
    price: 55.00,
    originalPrice: 80.00,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    description: "Automatic coffee maker with programmable timer",
    category: "home",
    stock: 45,
    rating: 4.3,
    reviews: 198,
    brand: "Keurig",
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany();
    console.log('🗑️ Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('✅ Sample products added successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();