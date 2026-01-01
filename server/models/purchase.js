const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  items: [{
    carId: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // Optional for future user accounts
  userId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Purchase', purchaseSchema);