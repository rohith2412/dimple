import { model, models, Schema, Types } from "mongoose";

const boiSchema = new Schema({
    user: { type: Types.ObjectId, ref: "User" },
    job:String,
    age:Number,
    location:String,
    phone:Number,
    username:String,
    // dp:
    bio:String,
    
}, { timestamps: true })

const Bio = models.Bio || model("Bio", boiSchema)
export default Bio;