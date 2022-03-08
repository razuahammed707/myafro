const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salonSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    location: { type: String, trim: true },
    category: {
      type: String,
      enum: ["public", "home_salon"],
    },
    contact:{
      mobile:String,
      country:String,
      address: String
    },
    media: [{
      img_url: String
    }],
    cover: {type:String, default: "imageURL"},
    price: { type: Number},
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    services: [{
      title:String
    }],
    features: {
      year:String,
      license:String,
      condition:String
    },
    optional: {
      type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("salon", salonSchema);
