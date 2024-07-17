import mongoose from "mongoose";

// const database = 'mongodb://localhost:27017'
const database = "mongodb://localhost/mern-fazt-db";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/mern-fazt-db");
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
