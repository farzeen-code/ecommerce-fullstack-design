const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) return callback(null, true);
    return callback(new Error(`CORS origin '${origin}' is not allowed`));
  },
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
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // Auto-seed initial catalog if empty
    try {
      const Product = require('./models/Product');
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('🌱 Database is empty. Auto-seeding initial product catalog...');
        const seedProducts = require('./seedData');
        await Product.insertMany(seedProducts);
        console.log(`✅ Successfully seeded ${seedProducts.length} products`);
      } else {
        console.log(`📦 Database loaded with ${count} existing products`);
      }
    } catch (seedErr) {
      console.error('⚠️ Auto-seed check notice:', seedErr.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });