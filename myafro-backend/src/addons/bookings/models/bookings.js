const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = Schema(
  {
    starting_time: {
      type: String,
      default: Date.now,
    },
    ending_time: {
      type: String,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "booked", "cancel", "complete"],
      default: "pending",
    },
    current_hair: [
      {
        img_url: String,
      },
    ],
    messages: [
      {
        user_type: String,
        message: String,
      },
    ],
    salon: {
      type: mongoose.Types.ObjectId,
      ref: "salon",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
