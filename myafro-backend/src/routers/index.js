const express = require("express");
const { verifyToken } = require("../middlewars/verify");
const router = express.Router();

router.use("/", require("../auth"));
router.use("/upload", require("../addons/upload"));
router.use("/", verifyToken, require("../addons"));

module.exports = router;
