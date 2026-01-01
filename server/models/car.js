const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true  // Keep the numeric ID from your JSON
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Optional fields that might be in some cars
  make: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);