const express = require('express');
const router = express.Router();
const {
  processPurchase,
  getAllPurchases
} = require('../controllers/purchaseController');

// POST /api/purchases - Process a purchase
router.post('/', processPurchase);

// GET /api/purchases - Get all purchases (admin)
router.get('/', getAllPurchases);

module.exports = router;