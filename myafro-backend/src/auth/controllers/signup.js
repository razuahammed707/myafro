const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const hbs = require("nodemailer-express-handlebars");
const handlebarOptions = require("../../../viewEngine");

// mail sender
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ronybarua.corexlab@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

//user sign up
const signup = async (req, res, next) => {
  try {
    const { email, mobile } = req.body;

    const user = await UserModel.findOne({
      email,
    });

    // user exists but not varified
    if (user && !user.is_verified) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const newOtp = await UserModel.findByIdAndUpdate(
        user._id,
        { otp: otp },
        { new: true }
      );

      const token = jwt.sign(
        {
          _id: newOtp._id,
          email: newOtp.email,
        },
        process.env.JWT_SECRET
      );
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Verify your email 👻" <ronybarua.corexlab@gmail.com>',
        to: newOtp.email,
        subject: "Verify Email",
        template: "email",
        context: {
          name: newOtp.full_name,
          token: token,
          otp: otp,
        },
      });
      res.send({
        message: "OTP has been sent. Check your email",
        status: true,
        user: newOtp,
      });
    }

    if (!user) {
      //generate random number
      const otp = Math.floor(1000 + Math.random() * 9000);
      const newUser = await UserModel.create({ ...req.body, otp });
      const token = jwt.sign(
        {
          _id: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET
      );

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Verify your email 👻" <ronybarua.corexlab@gmail.com>',
        to: newUser.email,
        subject: "Verify Email",
        template: "email",
        context: {
          name: newUser.full_name,
          token: token,
          otp: otp,
        },
      });
      res.send({
        message: "OTP has been sent. Check your email",
        status: true,
        user: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
