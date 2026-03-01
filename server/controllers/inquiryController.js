const Inquiry = require('../models/Inquiry');
const Product = require('../models/Product');

// Create new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { productId, userName, userEmail, message } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      productId,
      productName: product.name,
      userName,
      userEmail,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully! We will contact you soon.',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to send inquiry',
      error: error.message
    });
  }
};

// Get all inquiries (for admin)
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate('productId', 'name price image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
      .populate('productId', 'name price image description');

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update inquiry status (for admin)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update inquiry',
      error: error.message
    });
  }
};