const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  teams: {
    type: Array,
    required: [true, "Por favor agregue dos equipos"],
    ref: "Team",
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
  result: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.models.Match || mongoose.model("Match", MatchSchema);
