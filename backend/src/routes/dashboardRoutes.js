const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
// const authMiddleware = require('../middleware/authMiddleware'); // TODO

// router.use(authMiddleware); // Protect all routes

// Mock middleware for now if auth not implemented fully
const mockAuth = (req, res, next) => {
    req.user = { id: 1 }; // Mock user ID
    next();
};

router.get('/stats', mockAuth, dashboardController.getStats);
router.get('/loans', mockAuth, dashboardController.getActiveLoans);

module.exports = router;
