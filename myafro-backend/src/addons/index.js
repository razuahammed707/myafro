const express = require('express');
const { createBooking, getBookings, updateBooking, deleteBooking } = require('./bookings/controllers/bookings');
const { createReview, getReviews } = require('./reviews/controllers/reviews');
const { createSalon, getSalons, updateSalon, deleteSalon } = require('./salon/controllers/salon');
const router = express.Router()

// salon routers
router.post("/salons", createSalon);
router.get("/salons", getSalons);
router.put("/salons/:id", updateSalon);
router.delete("/salons/:id", deleteSalon);

// booking routers
router.post("/bookings", createBooking);
router.get("/bookings", getBookings);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

// review routes
router.post('/reviews', createReview)
router.get('/reviews', getReviews)


module.exports = router;