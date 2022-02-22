const mongoose = require("mongoose");

const db = process.env.MONGODB_URI
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("<===== Database connected successfully =====>");
  });
