const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true }
});

const USER = mongoose.model("user", userSchema);

module.exports = USER;
