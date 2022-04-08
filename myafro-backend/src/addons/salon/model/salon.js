const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: { type: String, trim: true },
    salon_type: {
      type: String,
      enum: ["Public", "Home Salon", "Both"],
    },
    hair_type: [String],
    contact: {
      mobile: String,
      country: String,
      address: String,
    },
    media: [
      {
        img_url: String,
      },
    ],
    cover: { type: String, default: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png" },
    price: { type: Number },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
    services: [
      {
        title: String,
      },
    ],

    features: {
      year: String,
      license: String,
      condition: String,
    },
    optional: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salon", salonSchema);
