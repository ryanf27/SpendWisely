import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.DATABASE_URI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
