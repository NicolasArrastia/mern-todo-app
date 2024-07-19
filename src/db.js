import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
