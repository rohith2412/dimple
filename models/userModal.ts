import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    name:String,
    email:String,
    image:String,
    profilePic: {
      type: String,
      default: '',
    },
})

const User = models.User || model("User", userSchema ) 
export default User;