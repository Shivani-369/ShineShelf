const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.get('/', clubController.getAllClubs);
router.post('/', clubController.createClub);
router.post('/join', clubController.joinClub);
router.get('/:clubId/posts', clubController.getClubPosts);
router.post('/posts', clubController.createPost);

module.exports = router;
