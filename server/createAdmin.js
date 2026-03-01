const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@ecommerce.com' });
    
    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      process.exit();
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@ecommerce.com',
      password: 'admin123456',  // Change this!
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@ecommerce.com');
    console.log('Password: admin123456');
    console.log('⚠️ IMPORTANT: Change this password in production!');

    process.exit();
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();