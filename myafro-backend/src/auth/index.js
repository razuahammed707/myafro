const express = require("express");
const createPassword = require("./controllers/createPassword");
const forgotPassword = require("./controllers/forgotPassword");
const login = require("./controllers/login");
const resetPassword = require("./controllers/resetPassword");
const { signup } = require("./controllers/signup");
const verifyEmail = require("./controllers/verifyEmail");
const router = express.Router();

router.post("/signup", signup);
router.post("/user/verify", verifyEmail);
router.put("/user/password/:pass_token", createPassword);
router.post("/user/login", login);
router.post("/user/forgot", forgotPassword);
router.put("/user/reset/:pass_token", resetPassword);

module.exports = router;
