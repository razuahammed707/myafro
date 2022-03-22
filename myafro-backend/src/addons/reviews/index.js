
const express = require('express');
const { createReview, getReviews } = require('./controllers/review');
const router = express.Router()

// review routes
router.post('/', createReview)
router.get('/:salonId', getReviews)

module.exports = router;
