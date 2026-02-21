const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const clubRoutes = require('./routes/clubRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const bookRoutes = require('./routes/bookRoutes');
const initDb = require('./config/init-db');
const seedDb = require('./config/seed');

const app = express();

// Initialize DB & Seed
initDb();
seedDb();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('LMS API Running');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
