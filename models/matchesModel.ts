import mongoose, { Schema, model, models, Document } from "mongoose";

interface IMatchedUser {
  name: string;
  email: string;
  username: string;
  gender: string;
  age: number;
  location: string;
  image: string;
}

const matchedUserSchema = new Schema<IMatchedUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
});

interface IMatch extends Document {
  user1: IMatchedUser;
  user2: IMatchedUser;
  createdAt: Date;
}

const matchSchema = new Schema<IMatch>(
  {
    user1: { type: matchedUserSchema, required: true },
    user2: { type: matchedUserSchema, required: true },
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 }, // expires after 7 days
  },
  { timestamps: true }
);

const Match = models.Match || model<IMatch>("Match", matchSchema);

export default Match;
