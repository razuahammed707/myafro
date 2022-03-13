
const express = require('express');
const imageUpload = require('../../middlewars/imageUpload');
const { createSalon, getSalons, updateSalon, deleteSalon, getSalon } = require('./controllers/salon');
const { createSalonMedia, deleteSalonMedia } = require('./controllers/salonMedia');
const { createSalonServices, deleteSalonServices, updateSalonServices } = require('./controllers/salonServices');
const router = express.Router()

// salon routers
router.post("/", createSalon);
router.get("/", getSalons);
router.get("/unique", getSalon);
router.put("/:id", updateSalon);
router.delete("/:id", deleteSalon);

// Salon Service 
router.post("/:salonID/services", createSalonServices);
router.delete("/:salonID/services/:serviceID",deleteSalonServices);
router.put("/:salonID/services/:serviceID",updateSalonServices);


// Salon media
router.post("/:salonID/media", imageUpload, createSalonMedia);
router.delete("/:salonID/media/:mediaID", deleteSalonMedia);

module.exports = router;
