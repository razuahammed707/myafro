const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

// verify email
const verifyEmail = async (req, res, next) => {
  try {
    const { password, otp } = req.body;
    const isVerified = await UserModel.findOne({ otp: otp });
    if (isVerified) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = await UserModel.findByIdAndUpdate(
        isVerified._id,
        {
          password: hashPassword,
          is_verified: true,
          otp: null,
        },
        { new: true }
      );
      res.send({
        status: true,
        message: "User created successfully",
        user: {
          _id: user._id,
          email: user.email,
          full_name: user.full_name,
          mobile: user.mobile,
          user_type: user.user_type,
        },
      });
    } else {
      res.send({
        status: false,
        message: "Your otp is not valid",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
