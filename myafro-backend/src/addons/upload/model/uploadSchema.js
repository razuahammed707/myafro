const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadSchema = Schema(
  {
    profile: String,
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("uploads", uploadSchema);
