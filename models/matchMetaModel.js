// models/matchMetaModel.js
import mongoose from "mongoose";

const matchMetaSchema = new mongoose.Schema({
  lastMatchedAt: {
    type: Date,
    required: true,
    default: Date.now, // first time only
  }
});

export default mongoose.models.MatchMeta || mongoose.model("MatchMeta", matchMetaSchema);
