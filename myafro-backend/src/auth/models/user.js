const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "The email is already exist"],
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      // unique: [true, "The mobile number is already taken"],
    },
    role: {
      type: String,
      enum: ["user", "hair_dresser"],
      required: true,
      trim: true,
    },
    password: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("user", userSchema);
