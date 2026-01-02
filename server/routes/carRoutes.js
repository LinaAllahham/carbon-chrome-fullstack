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

// POST /api/cars - Add new car
router.post('/', async (req, res) => {
  try {
    const Car = require('../models/car');
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/cars/:id - Delete car by numeric ID
router.delete('/:id', async (req, res) => {
  try {
    const Car = require('../models/car');
    const car = await Car.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully', deletedCar: car });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT /api/cars/:id - Update entire car
router.put('/:id', async (req, res) => {
  try {
    const Car = require('../models/Car');
    const car = await Car.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;