const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../models/user");

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const pass_token = req.params.pass_token;
    const { _id } = await jwt.decode(pass_token, process.env.JWT_SECRET);

    const user = await UserModel.findByIdAndUpdate(
      _id,
      { password: hashPassword },
      { new: true }
    );
    res.send({
      status: true,
      message: "Password reset successful",
      user: {
        _id: user._id,
        full_name: user.full_name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resetPassword;
