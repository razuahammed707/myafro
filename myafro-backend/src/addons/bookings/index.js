
const express = require('express');
const imageUpload = require('../../middlewars/imageUpload');
const { createBooking, getBookings, updateBooking, deleteBooking, getBookingsByUser } = require('./controllers/bookings');
const { createCurrentHairMedia, getCurrentMedia } = require('./controllers/currentHairMedia');
const { createMessage, getMessages } = require('./controllers/messages');
const router = express.Router()

// booking routers
router.post("/", createBooking);
router.get("/", getBookings);
router.get("/user", getBookingsByUser);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

// message route
router.put("/message/:bookingId", createMessage)
router.get("/message/:bookingId", getMessages)

// media route
router.put("/media/:bookingId", imageUpload, createCurrentHairMedia)
router.get("/media/:bookingId", getCurrentMedia)

module.exports = router;