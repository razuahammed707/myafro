
const express = require('express');
const { createBooking, getBookings, updateBooking, deleteBooking } = require('./controllers/bookings');
const router = express.Router()

// booking routers
router.post("/", createBooking);
router.get("/", getBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;