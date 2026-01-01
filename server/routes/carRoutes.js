const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  updateCarStock,
  getFilterOptions
} = require('../controllers/carController');

// GET /api/cars - Get all cars with filtering
router.get('/', getAllCars);

// GET /api/cars/filters - Get filter options
router.get('/filters', getFilterOptions);

// GET /api/cars/:id - Get single car
router.get('/:id', getCarById);

// PATCH /api/cars/:id/stock - Update car stock
router.patch('/:id/stock', updateCarStock);

module.exports = router;