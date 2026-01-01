const Car = require('../models/car');

// Get all cars with optional filtering - UPDATED FOR FRONTEND
const getAllCars = async (req, res) => {
  try {
    const { category, make, sort } = req.query; // Changed parameter names
    
    let filter = {};
    
    // Build filter object (matching frontend)
    if (category) filter.category = category;
    if (make) filter.make = make; // Now using make field
    
    let query = Car.find(filter);
    
    // Sorting (matching frontend values)
    if (sort === 'price-low') query = query.sort({ price: 1 }); // low-to-high
    if (sort === 'price-high') query = query.sort({ price: -1 }); // high-to-low
    if (sort === 'year-new') query = query.sort({ year: -1 }); // new-to-old
    if (sort === 'year-old') query = query.sort({ year: 1 }); // old-to-new
    
    const cars = await query;
    
    // Return in EXACT same format as frontend expects
    const formattedCars = cars.map(car => ({
      id: car.id,
      name: car.name,
      make: car.make,
      category: car.category,
      price: car.price,
      stock: car.stock,
      year: car.year,
      image: car.image
      // No make field needed in response (frontend extracts it)
    }));
    
    res.json(formattedCars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ id: parseInt(req.params.id) });
    if (!car) return res.status(404).json({ error: 'Car not found' });
    
    res.json({
      id: car.id,
      name: car.name,
      make: car.make,
      category: car.category,
      price: car.price,
      stock: car.stock,
      year: car.year,
      image: car.image
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update car stock
const updateCarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    
    const car = await Car.findOneAndUpdate(
      { id: parseInt(id) },
      { stock: stock },
      { new: true }
    );
    
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get filter options - UPDATED FOR FRONTEND
const getFilterOptions = async (req, res) => {
  try {
    const categories = await Car.distinct('category');
    const makes = await Car.distinct('make'); // Now we have make field
    
    res.json({
      categories,
      makes // Add makes to response
      // Frontend doesn't need years or priceRange from backend
      // because it handles sorting locally
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  updateCarStock,
  getFilterOptions
};