const express = require("express");
const { verifyToken } = require("../middlewars/verify");
const createPassword = require("./controllers/createPassword");
const forgotPassword = require("./controllers/forgotPassword");
const login = require("./controllers/login");
const resetPassword = require("./controllers/resetPassword");
const { signup } = require("./controllers/signup");
const { updateUser, getUser } = require("./controllers/user");
const verifyEmail = require("./controllers/verifyEmail");
const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyEmail);
router.post("/password/:pass_token", createPassword);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.put("/reset/:pass_token", resetPassword);
router.put("/user", verifyToken, updateUser )
router.get("/user", verifyToken, getUser )

module.exports = router;
