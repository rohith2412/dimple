import { model, models, Schema } from "mongoose";

const bioSchema = new Schema({
  user: { type: String, required: true, unique: true }, 
  username: String,
  bio: String,
  job: String,
  age: Number,
  gender: String,
  location: String,
}, { timestamps: true });

const Bio = models.Bio || model("Bio", bioSchema);
export default Bio;
