
const express = require('express');
const { createSalon, getSalons, updateSalon, deleteSalon, getSalon } = require('./controllers/salon');
const router = express.Router()



// salon routers
router.post("/", createSalon);
router.get("/", getSalons);
router.get("/", getSalon);
router.put("/:id", updateSalon);
router.delete("/:id", deleteSalon);

module.exports = router;
