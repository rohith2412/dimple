import { model, models, Schema } from "mongoose";

const photoModel = new Schema({
  user: { type: String, required: true, unique: true }, 
  url: { type: String, required: true },
  filename: { type: String },
}, { timestamps: true });

const Photo = models.Photo || model("Photo", photoModel);

export default Photo;