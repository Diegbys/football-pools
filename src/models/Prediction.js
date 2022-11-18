const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Por favor agregue el ganador"],
    ref: "Match",
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Team",
  },
  tie: {
    type: Boolean,
    required: false,
  },
});

module.exports =
  mongoose.models.Prediction || mongoose.model("Prediction", PredictionSchema);
