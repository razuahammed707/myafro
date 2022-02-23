const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

// verify email
const verifyEmail = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;

    const isUserExists = await UserModel.findOneAndUpdate(
      { mobile, otp },
      { otp: null, is_verified: true },
      { new: true }
    );

    if (!isUserExists) {
      res.status(401).send({
        status: false,
        message: "Provide valid otp or mobile",
      });
    }

    let pass_token = jwt.sign(
      { _id: isUserExists._id },
      process.env.JWT_SECRET
    );

    res.send({
      status: true,
      message: "User verified",
      pass_token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
