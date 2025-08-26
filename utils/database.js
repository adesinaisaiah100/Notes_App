import mongoose from "mongoose";

// Use environment variable for MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

// Global connection tracking for serverless environments
let isConnected = false; // Fixed typo

// Connection options for better performance and reliability
const options = {
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export const connectToDatabase = async () => {
  // Set strictQuery before connection
  mongoose.set("strictQuery", true);

  // Check if already connected
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return mongoose.connection;
  }

  try {
    // Connect to MongoDB with options
    await mongoose.connect(MONGODB_URI, options);

    isConnected = true;
    console.log("MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on("error", (error) => {
      console.error("MongoDB connection error:", error);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
      isConnected = false;
    });

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error; // Re-throw to handle in calling code
  }
};

// Optional: Export a disconnect function
export const disconnectFromDatabase = async () => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  }
};

// For compatibility with your existing code
export const connectDB = connectToDatabase;
