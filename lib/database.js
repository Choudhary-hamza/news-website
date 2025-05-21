const mongoose = require("mongoose");

let isConnected = false; // Global flag outside the function

const connectDb = async () => {
  if (isConnected) return; // Skip if already connected

  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.DB_CONNECTION, {
        serverSelectionTimeoutMS: 30000,
      });
      isConnected = true; // Mark as connected
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = connectDb;
