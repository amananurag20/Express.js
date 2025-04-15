const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    minLength: 5,
  },
  phoneNumber: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
