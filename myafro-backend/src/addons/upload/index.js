const express = require("express");
const imageUpload = require("../../middlewars/imageUpload");
const router = express.Router();
const { uploadImage } = require("./controllers");

//Create an Invoice
router.post("/", imageUpload, uploadImage);

module.exports = router;
