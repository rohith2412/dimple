import { model, models, Schema } from "mongoose";

const bioSchema = new Schema({
  user: { type: String, required: true, unique: true }, 
  job: String,
  age: Number,
  location: String,
  phone: Number,
  username: String,
  bio: String,
}, { timestamps: true });

const Bio = models.Bio || model("Bio", bioSchema);
export default Bio;
