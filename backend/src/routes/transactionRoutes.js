const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// In a real app, you'd have auth middleware here to get user ID
router.post('/borrow', transactionController.borrowBook);
router.post('/return/:transactionId', transactionController.returnBook);

module.exports = router;
