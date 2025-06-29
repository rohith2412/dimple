import mongoose from "mongoose";

const connectdb = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectdb;
