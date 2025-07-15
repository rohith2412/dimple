// models/matchHistoryModel.js
import mongoose from "mongoose";

const matchHistorySchema = new mongoose.Schema({
  email1: String,
  email2: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.MatchHistory || mongoose.model("MatchHistory", matchHistorySchema);
