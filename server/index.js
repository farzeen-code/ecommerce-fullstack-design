const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const productRoutes = require('./routes/productRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const authRoutes = require('./routes/authRoutes');

// Test Route - MOVE THIS BEFORE OTHER ROUTES
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-commerce API' });
});

// Use Routes - ONLY ONCE!
console.log('📍 Registering routes...');
app.use('/api/products', productRoutes);
console.log('✅ Product routes registered');
app.use('/api/newsletter', newsletterRoutes);
console.log('✅ Newsletter routes registered');
app.use('/api/inquiries', inquiryRoutes);
console.log('✅ Inquiry routes registered');
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes registered');

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });