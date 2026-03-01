const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus
} = require('../controllers/inquiryController');

router.post('/', createInquiry);
router.get('/', getAllInquiries);
router.get('/:id', getInquiryById);
router.put('/:id', updateInquiryStatus);

module.exports = router;