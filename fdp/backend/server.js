const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const registerRoutes = require('./routes/registerroutes.js');
const eventsRoutes = require('./routes/eventsroutes.js');
const paymentRoutes = require('./routes/paymentroutes.js');
app.use('/api', registerRoutes);
app.use('/api', eventsRoutes);
app.use('/api', paymentRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to MongoDB - payment_details'))
    .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});