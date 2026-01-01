

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Carbon & Chrome Backend' });
// });

// // Import routes
// const carRoutes = require('./routes/carRoutes');

// // Use routes
// app.use('/api/cars', carRoutes);

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend is working!' });
// });

// // Health check - SIMPLIFIED (no database check)
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     message: 'Server is running'
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // 404 handler - SIMPLE VERSION (add at the VERY END, after all routes)
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Carbon & Chrome Backend' });
});

// Import routes
const carRoutes = require('./routes/carRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// Use routes
app.use('/api/cars', carRoutes);
app.use('/api/purchases', purchaseRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Server is running'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 404 handler (at the end)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});