const express = require("express");
const { verifyToken } = require("../middlewars/verify");
const router = express.Router();

router.use("/", require("../auth"));
router.use("/upload", require("../addons/upload"));
// router.use("/", verifyToken, require("../addons"));
router.use("/salons", verifyToken, require("../addons/salon"))
router.use("/bookings", verifyToken, require("../addons/bookings"))
router.use("/reviews",verifyToken ,require("../addons/reviews"))

module.exports = router;
