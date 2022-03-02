const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const handlebarOptions = require("../../../viewEngine");
const UserModel = require("../models/user");

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

const forgotPassword = async (req, res, next) => {
  try {
    const { email, mobile } = req.body;
    const isExist = await UserModel.findOne({$or: [{email: email}, {mobile:mobile}]}).exec();
    if (isExist) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      await transporter.sendMail({
        from: '"Verify your email 👻" <ronybarua.corexlab@gmail.com>',
        to: isExist.email,
        subject: "Verify Email",
        template: "email",
        context: {
          name: isExist.full_name,
          otp: otp,
        },
      });

      await UserModel.findByIdAndUpdate(
        isExist._id,
        {
          otp: otp,
        },
        { new: true }
      );
      let verify = null
      if(email){
        verify = email
      }
      if(mobile){
        verify = mobile
      }
      res.status(200).send({
        status: true,
        message: "Otp has been sent to your email",
        verify
      });
    } else {
      res.status(404).send({
        status: false,
        message: "No records found regarding this email",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = forgotPassword;
