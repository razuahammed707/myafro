const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["public", "home_salon"],
    },
    media: [],
    rate: { type: Number, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salon", salonSchema);
