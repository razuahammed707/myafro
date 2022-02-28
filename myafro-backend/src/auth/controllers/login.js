const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            mobile: user.mobile,
          },
          process.env.JWT_SECRET
        );
        res.send({
          status: true,
          message: "Login successful",
          access_token: token,
          user: {
            _id: user._id,
            email: user.email,
            full_name: user.full_name,
            mobile: user.mobile,
            role: user.role,
          },
        });
      } else {
        res.send({
          status: false,
          message: "Login failed! wrong email or password",
        });
      }
    } else {
      res.send({
        status: false,
        message: "user not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = login;
