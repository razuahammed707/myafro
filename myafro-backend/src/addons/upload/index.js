const express = require("express");
const logoUpload = require("../../middlewars/logoUpload");
const router = express.Router();
const { uploadImage } = require("./controllers");

//Create an Invoice
router.post("/", logoUpload, uploadImage);

module.exports = router;
