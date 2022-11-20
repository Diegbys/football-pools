const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor agregue un nombre."],
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Team || mongoose.model("Team", TeamSchema);
