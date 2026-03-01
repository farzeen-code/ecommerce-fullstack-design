const Newsletter = require('../models/Newsletter.js');

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed!'
      });
    }

    // Create new subscriber
    const subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: subscriber
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to subscribe',
      error: error.message
    });
  }
};

// Get all subscribers (for admin)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort('-subscribedAt');
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};