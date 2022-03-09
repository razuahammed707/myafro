
const express = require('express');
const { createReview, getReviews } = require('./controllers/reviews');
const router = express.Router()

// review routes
router.post('/', createReview)
router.get('/', getReviews)

module.exports = router;
