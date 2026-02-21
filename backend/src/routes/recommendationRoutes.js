const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.get('/user/:userId', recommendationController.getPersonalizedRecommendations);
router.get('/book/:bookId', recommendationController.getSimilarBooks);

module.exports = router;
