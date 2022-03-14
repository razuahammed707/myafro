const UserModel = require("../models/user");

const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id }).select('-password -otp -is_verified');
    if (user) {
      res.status(200).send({
        status: true,
        message: "User is fetched successfully",
        user,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.user.id },
      req.body,
      {
        new: true,
      }
    ).select('-password -otp -is_verified');
    if (user) {
      res.status(200).send({
        status: true,
        message: "User is updated successfully",
        user,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "No records found regarding this id",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
    updateUser,
    getUser
};
