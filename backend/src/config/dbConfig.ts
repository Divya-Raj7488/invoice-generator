import mongoose from "mongoose";

const DbConfig = async (): Promise<void> => {
  const uri: string | undefined = process.env.DATABASE_URI;
  if (!uri) {
    console.error("DATABASE_URI environment variable is not defined");
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default DbConfig;
