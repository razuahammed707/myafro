const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = Schema(
  {
    img_url: String,
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("uploads", uploadSchema);
