import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const matchedUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

const matchSchema = new Schema(
  {
    user1: { type: matchedUserSchema, required: true },
    user2: { type: matchedUserSchema, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7, // expires after 7 days
    },
  },
  { timestamps: true }
);

const Match = models.Match || model("Match", matchSchema);

export default Match;
