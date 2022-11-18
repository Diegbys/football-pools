const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor agregue un nombre."],
  },
  rol: {
    type: Number,
    required: [false],
  },
  password: {
    type: String,
    required: [false],
  },
  points: {
    type: Number,
    required: false,
  },
  predictions: {
    type: Array,
    ref: "Prediction",
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
