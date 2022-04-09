const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    salon: {
      type: mongoose.Types.ObjectId,
      ref: "salon",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    booking: {
      type: mongoose.Types.ObjectId,
      ref: "booking",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("review", reviewSchema);
