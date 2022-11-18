const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
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
