import { model, models, Schema } from "mongoose";

const profilepicSchema = new Schema({
  user: { type: String, required: true, unique: true }, 
  url: { type: String, required: true },
  filename: { type: String },
}, { timestamps: true });

const ProfilePic = models.ProfilePic || model("ProfilePic", profilepicSchema);
export default ProfilePic;
