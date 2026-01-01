const Purchase = require('../models/purchase');
const Car = require('../models/car');

// Process a purchase - MATCHES YOUR FRONTEND
const processPurchase = async (req, res) => {
  try {
    const items = req.body; // Your frontend sends cart array directly
    
    // Validate request
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }
    
    // Check stock availability and calculate total
    let total = 0;
    const stockUpdates = [];
    
    for (const item of items) {
      // Find car by numeric ID (matching your frontend)
      const car = await Car.findOne({ id: item.id });
      
      if (!car) {
        return res.status(404).json({ error: `Car with ID ${item.id} not found` });
      }
      
      if (car.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${car.name}. Available: ${car.stock}, Requested: ${item.quantity}` 
        });
      }
      
      // Calculate item total (price × quantity)
      total += car.price * item.quantity;
      
      // Update stock
      car.stock -= item.quantity;
      if (car.stock < 0) car.stock = 0; // Safety check
      stockUpdates.push(car.save());
    }
    
    // Wait for all stock updates
    await Promise.all(stockUpdates);
    
    // Create purchase record with same structure as your cart items
    const purchase = new Purchase({
      items: items.map(item => ({
        carId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      total: total,
      date: new Date()
    });
    
    await purchase.save();
    
    // Return success response
    res.status(201).json({ 
      success: true,
      message: 'Purchase completed successfully',
      purchaseId: purchase._id,
      total: total,
      itemsCount: items.length
    });
    
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all purchases (optional for admin)
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ date: -1 });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  processPurchase,
  getAllPurchases
};